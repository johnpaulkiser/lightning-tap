import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { QrReader } from "react-qr-reader";

export default function InvoiceReader({
  setInvoice,
  open,
  setOpen,
}: {
  setInvoice: any;
  open: any;
  setOpen: any;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-md sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CameraIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Scan Invoice
                    </Dialog.Title>
                    <div className="mt-2">
                      <QrReader
                        className="mx-auto"
                        onResult={(result, err) => {
                          if (result) {
                            setInvoice(result.getText());
                            //TODO: animate close
                            setOpen(false);
                          }
                        }}
                        constraints={{
                          sampleRate: 10,
                          facingMode: "environment",
                        }}
                        ViewFinder={() => (
                          <div className="absolute top-0 left-0 h-full w-full">
                            <div className="relative left-1/2 top-1/2 z-10 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-lg border-4 border-dashed border-gray-400/60" />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
