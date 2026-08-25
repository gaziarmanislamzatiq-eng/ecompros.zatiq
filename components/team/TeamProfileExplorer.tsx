"use client";

import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { TeamMember } from "@/lib/team";

type TeamProfileExplorerProps = {
  members: TeamMember[];
};

type ProfileDetailsProps = {
  member: TeamMember;
  titleId: string;
};

const PANEL_ID = "team-profile-panel";
const DIALOG_TITLE_ID = "team-profile-dialog-title";

function ProfileDetails({ member, titleId }: ProfileDetailsProps) {
  const { profile } = member;

  return (
    <div className="team-profile__content">
      <div className="team-profile__intro">
        <p className="team-profile__designation">{member.designation}</p>
        <h3 className="team-profile__name" id={titleId}>
          {member.name}
        </h3>
        <p className="team-profile__context">{profile.roleContext}</p>
      </div>

      <p className="team-profile__summary">{profile.summary}</p>

      <div className="team-profile__block">
        <h4>Focus areas</h4>
        <ul className="team-profile__chips">
          {profile.focusAreas.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="team-profile__block">
        <h4>Experience highlights</h4>
        <ul className="team-profile__list">
          {profile.experienceHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="team-profile__block">
        <h4>Proof points</h4>
        <ul className="team-profile__list">
          {profile.proofPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="team-profile__block">
        <h4>Skills</h4>
        <ul className="team-profile__chips">
          {profile.skills.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {profile.education.length > 0 ? (
        <div className="team-profile__block">
          <h4>Education</h4>
          <ul className="team-profile__list">
            {profile.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {profile.certifications.length > 0 ? (
        <div className="team-profile__block">
          <h4>Certifications</h4>
          <ul className="team-profile__list">
            {profile.certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function TeamProfileExplorer({ members }: TeamProfileExplorerProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const selectedMember = useMemo(
    () => members.find((member) => member.slug === selectedSlug) ?? null,
    [members, selectedSlug],
  );

  const closeDialog = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
      return;
    }

    setSelectedSlug(null);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (selectedMember && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!selectedMember && dialog.open) {
      dialog.close();
    }
  }, [selectedMember]);

  function selectMember(member: TeamMember, event: MouseEvent<HTMLButtonElement>) {
    lastTriggerRef.current = event.currentTarget;
    setSelectedSlug(member.slug);
  }

  function handleDialogClose() {
    setSelectedSlug(null);
    lastTriggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="team-explorer">
      <ul className="team-grid" aria-label="Ecom ProDesk team members">
        {members.map((member, index) => (
          <li
            className="team-card-wrap"
            data-cinematic="rise"
            data-cinematic-delay={`${Math.min(index + 1, 6)}`}
            key={member.slug}
          >
            <button
              aria-controls={PANEL_ID}
              aria-expanded={selectedSlug === member.slug && Boolean(selectedMember)}
              aria-haspopup="dialog"
              aria-label={`Show profile for ${member.name}`}
              className="team-card"
              onClick={(event) => selectMember(member, event)}
              type="button"
            >
              <span className="team-card__media">
                <Image
                  alt={member.image.alt}
                  fetchPriority={index === 0 ? "high" : undefined}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 959px) calc((100vw - 3rem) / 2), 18vw"
                  src={member.image.src}
                />
              </span>

              <span className="team-card__body">
                <span className="team-card__designation">{member.designation}</span>
                <span className="team-card__name">{member.name}</span>
                <span className="team-card__cue">
                  Read profile
                  <ArrowRight aria-hidden="true" size={16} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        aria-labelledby={selectedMember ? DIALOG_TITLE_ID : undefined}
        className="team-profile-dialog"
        id={PANEL_ID}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
        onClose={handleDialogClose}
        ref={dialogRef}
      >
        {selectedMember ? (
          <div className="team-profile-dialog__sheet">
            <div className="team-profile-dialog__top">
              <p className="team-profile-dialog__label">Profile details</p>
              <button
                aria-label="Close profile details"
                className="team-profile-dialog__close"
                onClick={closeDialog}
                type="button"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            <ProfileDetails member={selectedMember} titleId={DIALOG_TITLE_ID} />
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
