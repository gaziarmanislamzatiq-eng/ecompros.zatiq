import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable, InertiaPlugin);
}

export type HorizontalLoopConfig = {
  /** Idle auto-scroll. Defaults to false: the row only moves on drag. */
  autoPlay?: boolean;
  draggable?: boolean;
  paddingRight?: number;
  speed?: number;
};

export type HorizontalLoop = {
  kill: () => void;
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  timeline: gsap.core.Timeline;
};

/**
 * Adapted from GSAP's public "seamless horizontal loop" helper function:
 * items keep their natural flex layout; xPercent offsets (driven by a
 * repeat:-1 timeline) make the row appear to scroll infinitely with no
 * duplicated DOM nodes. A Draggable proxy scrubs the timeline's progress
 * and snaps to the nearest item on release.
 */
export function horizontalLoop(
  items: HTMLElement[],
  config: HorizontalLoopConfig = {},
): HorizontalLoop {
  const length = items.length;
  const startX = items[0].offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const spaceBefore: number[] = [];
  const xPercents: number[] = [];
  const pixelsPerSecond = (config.speed || 1) * 100;
  const container = items[0].parentNode as HTMLElement;
  let totalWidth = 0;
  let timeWrap: (value: number) => number = (value) => value;
  let curIndex = 0;

  const autoPlay = config.autoPlay ?? false;

  const tl = gsap.timeline({
    repeat: -1,
    paused: !autoPlay,
    defaults: { ease: "none" },
    onReverseComplete() {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });

  const getTotalWidth = () =>
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    spaceBefore[0] +
    items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) +
    (config.paddingRight || 0);

  const populateWidths = () => {
    let b1 = container.getBoundingClientRect();
    let b2: DOMRect;
    items.forEach((el, i) => {
      widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
      xPercents[i] =
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i]) * 100 +
        (gsap.getProperty(el, "xPercent") as number);
      b2 = el.getBoundingClientRect();
      spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
      b1 = b2;
    });
    gsap.set(items, { xPercent: (i: number) => xPercents[i] });
    totalWidth = getTotalWidth();
  };

  const getClosest = (values: number[], value: number, wrap: number) => {
    let i = values.length;
    let closest = Infinity;
    let index = 0;
    while (i--) {
      let d = Math.abs(values[i] - value);
      if (d > wrap / 2) d = wrap - d;
      if (d < closest) {
        closest = d;
        index = i;
      }
    }
    return index;
  };

  const populateTimeline = () => {
    tl.clear();
    for (let i = 0; i < length; i++) {
      const item = items[i];
      const curX = (xPercents[i] / 100) * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
      const distanceToLoop =
        distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

      tl.to(
        item,
        {
          xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
          duration: distanceToLoop / pixelsPerSecond,
        },
        0,
      )
        .fromTo(
          item,
          { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100 },
          {
            xPercent: xPercents[i],
            duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond,
        )
        .add(`label${i}`, distanceToStart / pixelsPerSecond);

      times[i] = distanceToStart / pixelsPerSecond;
    }
    timeWrap = gsap.utils.wrap(0, tl.duration());
  };

  // Items may be DOM nodes reused from a previous instance (e.g. a tab
  // switch that swaps `cards` but keeps the same keyed elements) — reset
  // xPercent too, or leftover transform state corrupts the width/position
  // math below and strands cards off-screen.
  gsap.set(items, { x: 0, xPercent: 0 });
  populateWidths();
  populateTimeline();

  const onResize = () => {
    const progress = tl.progress();
    tl.progress(0, true);
    populateWidths();
    populateTimeline();
    tl.progress(progress, true);
  };

  window.addEventListener("resize", onResize);

  tl.progress(1, true).progress(0, true);
  curIndex = getClosest(times, tl.time(), tl.duration());

  function toIndex(index: number, vars: gsap.TweenVars = {}) {
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];
    if (time > tl.time() !== index > curIndex && index !== curIndex) {
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    if (time < 0 || time > tl.duration()) {
      vars.modifiers = { time: timeWrap };
    }
    curIndex = newIndex;
    vars.overwrite = true;
    gsap.killTweensOf(tl);
    tl.pause();
    return tl.tweenTo(time, vars);
  }

  let draggableInstance: Draggable | undefined;

  if (config.draggable) {
    const proxy = document.createElement("div");
    const wrap = gsap.utils.wrap(0, 1);
    // Computed once from the untransformed layout, not re-derived from
    // (already-transformed) live DOM state on every press — re-deriving
    // repeatedly let sub-pixel rounding compound across drags and drift
    // cards out of alignment with each other.
    const ratio = 1 / totalWidth;
    let startProgress = 0;

    const align = () => {
      tl.progress(
        wrap(startProgress + (draggableInstance!.startX - draggableInstance!.x) * ratio),
      );
    };

    const syncIndex = () => {
      curIndex = getClosest(times, tl.time(), tl.duration());
    };

    const [created] = Draggable.create(proxy, {
      trigger: container,
      type: "x",
      inertia: true,
      onPressInit() {
        gsap.killTweensOf(tl);
        tl.pause();
        startProgress = tl.progress();
        gsap.set(proxy, { x: startProgress / -ratio });
      },
      onDrag: align,
      onThrowUpdate: align,
      snap(value: number) {
        const time = -(value * ratio) * tl.duration();
        const wrappedTime = timeWrap(time);
        const snapIndex = getClosest(times, wrappedTime, tl.duration());
        const snapTime = times[snapIndex];
        let dif = snapTime - wrappedTime;
        if (Math.abs(dif) > tl.duration() / 2) {
          dif += dif < 0 ? tl.duration() : -tl.duration();
        }
        return (time + dif) / tl.duration() / -ratio;
      },
      onRelease: syncIndex,
      onThrowComplete: () => {
        syncIndex();
        if (autoPlay) tl.play();
      },
    });

    draggableInstance = created;
  }

  return {
    next: (vars) => toIndex(curIndex + 1, vars),
    previous: (vars) => toIndex(curIndex - 1, vars),
    timeline: tl,
    kill: () => {
      window.removeEventListener("resize", onResize);
      draggableInstance?.kill();
      tl.kill();
    },
  };
}
