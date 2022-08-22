import { PropsWithChildren } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

export const Modal = ({ children, ...props }: Props) => {
  return (
    <div>
      <Dialog {...props} className="static sm:relative z-50">
        <div className="fixed inset-0 bg-white/80" aria-hidden />
        <div className="fixed inset-0 flex items-center justify-center sm:p-4">
          <Dialog.Panel className="mx-auto max-w-md sm:rounded-sm bg-white shadow-lg min-h-[44px] max-h-full overflow-y-auto border-t-2 border-primary">
            <div className="relative">
              <div
                className="absolute right-0 top-0 p-1 m-1 text-xl text-zinc-400 cursor-pointer"
                onClick={props.onClose}
              >
                <XIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="px-9 pt-7 pb-10">{children}</div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
