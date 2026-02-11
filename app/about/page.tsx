
import { Achievements, Process, Work } from '@/components/homeabout/Achiementsdemo'
import React from 'react' 

import AboutHero from './About'
import AboutUsSection from './AboutUsSection'
import BrihaspathiDeployments from './BrihaspathiDeployments'
import ValuesSection from './ValuesSection'
import OurJourney from './our-journey/page'
import { TestimonialCarousel } from '@/components/homeabout/bard'
import OurTeamSection from '@/components/homeabout/OurTeamSection'




function page() {
  return (
    <div className="w-full overflow-x-hidden">

<AboutHero/>

<AboutUsSection/>

<TestimonialCarousel/>

<Process/>

<OurTeamSection/>
<OurJourney/>

<ValuesSection/>
<BrihaspathiDeployments/>

    </div>
  )
}

export default page