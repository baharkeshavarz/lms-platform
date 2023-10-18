import Image from 'next/image'

const Logo = () => {
  return (
      <Image
          src="/logo.svg"
          width={100}
          height={100}
          alt="lms"
         />
   )
}

export default Logo;
