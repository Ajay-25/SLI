//components
import { SectionSeparator } from '@/app/ui/home/SectionSeparator';
import Image from 'next/image';

//types
import { ReactNode } from 'react';

const BannerImageSection = () => {
  return (
    <div className="h-[60rem] w-full bg-[url('/home/courses-content.webp')] bg-cover bg-center"></div>
  );
};

const Item = ({
  source,
  altText,
  children,
}: {
  source: string;
  altText: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex gap-8 p-12">
      <Image
        src={source}
        width={180}
        height={180}
        alt={altText}
        className="self-start"
      />
      <div className="text-24 text-sos-primary-blue">{children}</div>
    </div>
  );
};

const ItemList = () => {
  return (
    <div className="mx-[14.2rem] flex flex-col">
      <Item
        source="/home/loving-communication.webp"
        altText="Loving Communication"
      >
        <div>
          The Loving Communication workshop encourages participants to explore
          the significance of genuine listening and practice heart to heart and
          soul to soul communication. It offers techniques to transform negative
          interactions into positive ones and fosters a receptive approach to
          feedback.
        </div>
      </Item>
      <SectionSeparator />
      <Item
        source="/home/serving-others.webp"
        altText="Serving Others As they grow"
      >
        <div>
          Serving Others As They Grow is a leadership workshop by The Service
          Leadership Institute, designed to enhance the essential skills for
          effective leadership. Focused on motivation, encouragement, and
          feedback, this two session workshop applies the guidance of Sant
          Rajinder Singh to create an environment for motivation, inspire the
          best in others, and provide constructive feedback. Rooted in the
          teachings of SOS, the workshop offers practical insights for
          participants to become authentic service leaders, combining wisdom and
          hands on techniques for effective leadership.
        </div>
      </Item>
      <SectionSeparator />
      <Item source="/home/delegation.webp" altText="Delegation">
        <div className="flex flex-col gap-8">
          <p>
            As leaders in a variety of roles, we know that delegation is needed,
            but it&apos;s difficult to put it into action. The delegation course
            is designed to help you learn more about how to effectively delegate
            and take the next steps in delegating tasks to others. Participants
            will:
          </p>
          <ul className="list-inside list-disc">
            <li>clarify rationale and benefits of delegation</li>
            <li>explore criteria for identifying tasks to delegate</li>
            <li>
              apply communication strategies to their own experience with
              delegation
            </li>
            <li>
              develop an action plan to delegate tasks in their department
            </li>
          </ul>
        </div>
      </Item>
      <SectionSeparator />
      <Item
        source="/home/conflict-resolution.webp"
        altText="Conflict Resolution"
      >
        <div>
          In the conflict resolution workshop you will share a simple technique
          you can immediately put into practice to lovingly navigate through
          challenging and conflicting situations with grace and ease. Working in
          small groups, you will learn how to manage and resolve conflict that
          can arise in different forms, while broadening your skill set.
        </div>
      </Item>
      <SectionSeparator />
      <Item
        source="/home/effective_meeting_management.webp"
        altText="Meeting Managment"
      >
        <div className="flex flex-col gap-6">
          <p>
            One of the ways leaders help others engage in meaningful seva is by
            facilitating constructive meetings where participants feel engaged
            and valued and where the outcomes of the meeting result in
            empowering team members to contribute to the work of the mission. As
            a result, leaders are often called on to conduct meetings, plan
            events, disseminate information or to involve the team in matters
            pertaining to operations and administration.
          </p>
          <p>
            There are tried and true techniques for running efficient meetings,
            such as setting agendas, establishing ground rules, and facilitating
            inclusive discussions. This workshop not only teaches these skills
            aimed at improving the productiveness of meetings, but it also
            reveals how effectively facilitating meetings is an important avenue
            for service leaders to reflect the qualities of the soul and to
            express the kind of patience, humility and respect that are part of
            a satsang community working together with love and grace.
          </p>
        </div>
      </Item>
      <SectionSeparator />
      <Item
        source="/home/collaborative_decision_making.webp"
        altText="Collaborative Decision Making"
      >
        <div className="flex flex-col gap-6">
          <p>
            Collaborative Decision Making Teaches an essential skill because
            many issues that come up in the mission involve interfacing with
            others and gaining agreement from all concerned parties, reaching
            decisions collaboratively with other team members is a critical
            capability to develop and implement. Whether it concerns a simple
            decision such as agreeing what type of Outreach event to hold or as
            complex as deciding on a budget for the upcoming year, when two or
            more people are involved, differing opinions are best resolved
            through collaboration.
          </p>
          <p>
            In this workshop, different approaches to decision making are
            identified and situations where each is likely to be most
            appropriate are discussed. The primary focus is on techniques
            related to collaborative approaches to decision making because it is
            the responsibility of service leaders to ensure that good decisions
            are made and acted upon effectively.
          </p>
          <p>
            The spiritual principles underlying collaboration practices are also
            highlighted and the importance of open communication, a loving
            approach, and clarity of purpose for creating a good decision making
            environment.
          </p>
        </div>
      </Item>
      <SectionSeparator />
      <Item
        source="/home/building_lasting_change.webp"
        altText="Building Lasting Change"
      >
        <div>
          Building lasting change creates a safe space in which SOS leaders can
          reflect on their successes and challenges through the lens of the
          Qualities of the Soul, resulting in greater joy, love and service. SLI
          Coaching will allow us to take a journey together, as we support one
          another in having the Qualities of the Soul become more and more
          prominent in us, and in our seva, with a specific focus on Loving
          Communication.
        </div>
      </Item>
    </div>
  );
};

export default function Page() {
  return (
    <article className="flex flex-col gap-6 pb-[8rem]">
      <BannerImageSection />
      <ItemList />
    </article>
  );
}
