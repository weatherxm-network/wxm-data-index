'use client';
import { defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { filecoinCalibration } from 'viem/chains'
import { Text, Title } from "@tremor/react";
import Image from 'next/image'
import Logo from '../../public/logo.svg'
import DataTable from './components/dataTable';
import Footer from './components/footer';

const metadata = {
  name: 'WXM Data Index',
  description: 'WeatherXM Data Index',
  url: 'https://weatherxm.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [filecoinCalibration]
const wagmiConfig = defaultWagmiConfig({ chains, projectId: '_', metadata })

const Home = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="relative flex flex-col min-h-screen p-5 sm:p-10 !pb-[60px] bg-gray-50">
        <Image src={Logo} className='mb-5' alt='logo'/>
        <Title>WeatherXM Data Index</Title>
        <Text className='mb-5'>Explore station weather data and rewards stored on IPFS/Filecoin.</Text>
        <DataTable/>
        <Footer/>
      </div>
    </WagmiConfig>
  )
}

export default Home;