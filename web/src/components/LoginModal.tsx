import { Dialog, Tab } from "@headlessui/react";

export const LoginModal = () => {
  return (
    <Dialog open={true} onClose={() => {}}>
      <div className="fixed inset-0 bg-black/5" aria-hidden="true" />
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4">
        <Tab.Group>
          <Tab.List>
            <Tab>Login</Tab>
            <Tab>Create Room</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
                <Dialog.Title>Login</Dialog.Title>
                <p>You can login here</p>
              </Dialog.Panel>
            </Tab.Panel>
            <Tab.Panel>
              <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
                <Dialog.Title>Create Room</Dialog.Title>
                <p>You can create a room here</p>
              </Dialog.Panel>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Dialog>
  );
};
