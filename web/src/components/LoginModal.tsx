import { Dialog, Tab } from "@headlessui/react";

export const LoginModal = () => {
  return (
    <Dialog open={true} onClose={() => {}}>
      <div className="fixed inset-0 bg-black/5" aria-hidden="true" />
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded bg-white p-4 shadow-md">
          <Tab.Group>
            <Tab.List className="flex border rounded mb-2 bg-zinc-100 text-zinc-600">
              {["Login", "Create"].map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    `w-full text-center rounded py-1 px-4 ${
                      selected && "bg-white text-black shadow-sm"
                    }`
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <Dialog.Title>Login</Dialog.Title>
                <p>You can login here</p>
              </Tab.Panel>
              <Tab.Panel>
                <Dialog.Title>Create</Dialog.Title>
                <p>You can create a room here</p>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
