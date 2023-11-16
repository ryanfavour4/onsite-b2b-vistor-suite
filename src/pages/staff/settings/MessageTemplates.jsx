import React from 'react'
import VisitorCheckIn from '../../../components/tabs/tab-contents/message-templates/VisitorCheckIn'
import VisitorCheckOut from '../../../components/tabs/tab-contents/message-templates/VisitorCheckOut'
import EventCheckIn from '../../../components/tabs/tab-contents/message-templates/EventCheckIn'
import Tabs from '../../../components/tabs/Tabs'

const MessageTemplates = () => {



    return (
        <div>
            {/* <Tabs tabTitles={['Visitor Check In', 'Visitor Check Out', 'Event Check In']} tabContents={[<VisitorCheckIn />, <VisitorCheckOut />, <EventCheckIn />]} /> */}

            <Tabs tabTitles={['Visitor Check Out', 'Event Check In']} tabContents={[<VisitorCheckOut />, <EventCheckIn />]} />
        </div>
    )
}

export default MessageTemplates