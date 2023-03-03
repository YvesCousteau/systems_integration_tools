import { Fragment, useEffect, useState } from 'react'

export default function Alert(props) {
  useEffect(() => {
    setTimeout(() => props.setData({...props.data,...{active:false}}), 3000);
  }, [props.data]);
  return (
    <div className={` absolute top-0 right-10  transform  transition duration-500 translate-y-0 ease-in-out ${props.data.active ? "translate-y-8 visible" : "translate-y-0 invisible"}`}>
      <div className={`grid grid-cols-1  border px-4 py-3 rounded-xl relative ${props.data.type == "Error" && "bg-red-100 border-red-400 text-red-700" } ${props.data.type == "Success" && "bg-green-100 border-green-400 text-green-700" }`} role="alert">
        <strong className="font-bold">{props.data.type + ' => ' + props.data.status}</strong>
        <span className="block sm:inline">{props.data.url}</span>
      </div>
    </div>
  )
}