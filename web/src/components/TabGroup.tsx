import { Tab } from "@headlessui/react";
import { ReactNode } from "react";

type Props = {
  tabs: {
    label: string;
    element: ReactNode;
  }[];
};

export const TabGroup = ({ tabs }: Props) => {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex border rounded-sm mb-2 bg-zinc-100 text-zinc-600">
          {tabs.map((tab, i) => (
            <Tab
              key={tab.label + i}
              className={({ selected }) =>
                `w-full text-center rounded py-1 px-4 ${
                  selected && "bg-white text-black shadow-sm"
                }`
              }
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel>{tab.element}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
