import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Modal(props) {
  const [state, setState] = useState(false);
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className=" px-4 pt-4 pb-2">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-800">
                        {props.test.function}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Here you can describe what you want with this function.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="flex justify-center text-xl font-bold color-classic">State run :&nbsp;{props.test.state?(<div className='text-green-700'>Actif</div>):(<div className='text-red-700'>Inactif</div>)}</p>
                <div className='flex px-8 pt-4'>
                  
                  <div className='bg-gray-300 py-4 rounded-[12px] grid grid-cols-3 w-full '>
                    <div className='mx-auto text-lg font-semibold'>Result :</div>
                    <button 
                    className='text-lg  bg-green-700 px-4 text-white rounded-[12px] w-24 shadow-md hover:bg-green-800 active:bg-green-900' 
                    onClick={()=> props.setTest({...props.test,state: true})}>
                      Valid
                    </button>
                    <button className='text-lg  bg-red-700 px-4 text-white rounded-[12px] w-24 shadow-md hover:bg-red-800 active:bg-red-900' onClick={()=> props.setTest({...props.test,state: false})}>
                      Unvalid
                    </button>
                  </div>
                  
                </div>
                <div className=" px-4 py-4 sm:flex sm:flex-row-reverse sm:px-8">
                  <button
                    type="button"
                    className="btn btn-close"
                    onClick={() => props.setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}