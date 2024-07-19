'use client'

import Image from "next/image"

const Loading = () => {
  return (
    <div>
      <div className="h-screen w-screen flex justify-center items-center">
        <Image
        src={"/images/loading.svg"}
        alt="loading image"
        width={400}
        height={400}
        />
        <h1 className="text-2xl font-bold">Please wait...</h1>
      </div>
    </div>
  )
}

export default Loading
