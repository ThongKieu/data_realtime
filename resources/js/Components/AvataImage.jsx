import React from 'react'

export default function AvataImage({children}) {
  return (
    <>
        <img src={children} className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md border border-blue-500 p-0.56" alt=""/>
    </>
  )
}
