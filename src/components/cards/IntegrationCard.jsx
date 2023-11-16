import React from 'react'
import { useState } from 'react'
import EventbriteModal from '../modals/EventbriteModal'

const IntegrationCard = ({ title, description, status, logo, showModal, setShowModal }) => {

    return (
        <>
            <div className='bg-white p-3 rounded-md shadow-md'>
                <div className='w-ful h-12 mb-8 justify-center'>
                    <img src={logo} className='h-full object-cover mr-auto w-full' />
                </div>
                <h3 className='text-md mb-4 capitalize'>
                    {title}
                </h3>
                <p className='text-sm font-light'>
                    {description}
                </p>
                <div className='flex justify-between mt-4 '>
                    <button className={`${status === 'active' ? 'bg-green' : 'bg-darkred'} px-6 py-3 text-white font-semibold rounded-md uppercase`}>
                        {status}
                    </button>
                    <button className={`bg-blue px-6 py-3 text-white font-semibold rounded-md uppercase`} onClick={() => {
                        if (title.toLowerCase() == 'eventbrite') {
                            setShowModal(true)
                        }
                    }}>
                        Connect
                    </button>
                </div>

            </div>

        </>
    )
}

export default IntegrationCard