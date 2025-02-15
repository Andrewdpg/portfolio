import React from 'react'
import Card from '../../../components/Card'
import { UserData } from '../components/UserData'
import { AboutMe } from '../components/AboutMe'
import { Examples } from '../components/Examples'

function Dashboard() {

  return (
    <>
      <div className="w-full p-4 flex flex-col gap-4 transition-all duration-1000 ease-in-out">
        <Card className="min-h-64 flex flex-col p-4 gap-2 transition-all duration-300 ease-in-out">
          <UserData />
          <div className="flex flex-wrap items-center gap-4 transition-all duration-300 ease-in-out">
            <AboutMe />
            <Examples />
          </div>
        </Card>
      </div>
    </>
  )
}

export default Dashboard
