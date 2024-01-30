import { Flex, Col, Text } from '@tremor/react'
import Image from 'next/image'
import Discord from '../../../../public/discord.svg'
import Github from '../../../../public/github.svg'
import Globe from '../../../../public/globe-solid.svg'

const Footer = () => {
  return (
    <footer className='absolute bottom-5 left-0 w-full px-5 sm:px-10'>
      <Flex justifyContent='between' className='w-full mt-5'>
        <Col numColSpan={2}>
          <Text>© 2023 WeatherXM</Text>
        </Col>
        <Col numColSpan={2}>
          <Flex>
            <a href='https://weatherxm.com' target='_blank' rel='noreferrer' className='bg-gray-100 rounded-lg p-[6px] mx-2'>
              <Image src={Globe} alt='website'/>
            </a>
            <a href='https://weatherxm.com/discord' target='_blank' rel='noreferrer' className='bg-gray-100 rounded-lg p-[6px] mx-2'>
              <Image src={Discord}alt='discord'/>
            </a>
            <a href='https://github.com/WeatherXM' target='_blank' rel='noreferrer' className='bg-gray-100 rounded-lg p-[6px] ml-2'>
              <Image src={Github} alt='github'/>
            </a>
          </Flex>
        </Col>
      </Flex>
    </footer>

  )
}

export default Footer;
