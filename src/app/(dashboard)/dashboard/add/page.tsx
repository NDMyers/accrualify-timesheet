'use client'
import ToDashButton from '@/components/ToDashButton'
import React, { FC, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PlusSquare, XSquare } from 'lucide-react'
import toast from 'react-hot-toast'


const page: FC = ({}) => {

    const [lineItems, setLineItems] = useState<LineItem[]>([ {date: '', minutes: 0 }])
    const [description, setDescription] = useState<string>()
    const [rate, setRate] = useState<number>()
    const [timeSheet, setTimeSheet] = useState<TimeSheet>({
        lineItems: lineItems,
        description: '',
        rate: NaN
    })

    const addLineItem = () => {
        setLineItems([...lineItems, { date: '', minutes: 0 }])
    }   

    const deleteLineItem = () => {
        if (lineItems.length > 1) {
            const updatedLineItems = [...lineItems]
            updatedLineItems.pop()
            setLineItems(updatedLineItems)
        }
    }

    const handleInputChange = (index: number, name: keyof LineItem, value: string | number) => {
        const updatedLineItems = [...lineItems]
        if (name === 'date' && typeof(value) == 'string') {
            updatedLineItems[index].date = value
        } else if (name === 'minutes' && typeof(value) == 'number') {
            updatedLineItems[index].minutes = value
        }
        setLineItems(updatedLineItems)
        timeSheet.lineItems = updatedLineItems
      };

    const handleDescriptionChange = (value: string) => {
        setDescription(value)
        timeSheet.description = value
    }

    const handleRateChange = (value: number) => {
        setRate(value)
        timeSheet.rate = value
    }

    const handleSubmit = async () => {

        if ( description === undefined || rate === undefined ) {
            toast.error("Please fill in required forms")
        } else {
            console.log(timeSheet)
        }
    }
    
    return (
        <main className='flex flex-col items-center justify-between w-full min-h-screen p-6'>

            <div className='flex flex-col'>
                <div className='flex items-center justify-center pb-4'>
                    <motion.button 
                        className='flex self-center justify-center w-1/2'
                        onClick={addLineItem}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05, color: 'rgb(10 165 109)'}}>
                            <PlusSquare className='mr-2 text-emerald-500'/>
                            <a>Add line item</a>
                    </motion.button>
                    {lineItems.length > 1 && (
                        <motion.button
                        className='flex self-center justify-center w-1/2'
                        onClick={deleteLineItem}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05, color: 'rgb(219 38 38)'}}>
                            <XSquare className='mr-2 text-red-500' />
                            <a>Delete line item</a>
                        </motion.button>
                    )}
                </div>
                {lineItems.length < 0 ? null :
                (   
                    <div className='mb-12'>
                        {lineItems.map((lineItem: any, index: number) => (
                            <li key={index} className='flex justify-between border-b-2 border-gray-900 p-2' >
                                {/* +1 bc of 0th index for user understandability */}
                                <div className='flex'>
                                    <a className='mr-2'>{index+1}:</a>
                                    <input
                                        type='date'
                                        placeholder='date'
                                        onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                                    />
                                </div>
                                <div className='flex'>
                                    <input
                                        type='number'
                                        placeholder='minutes' 
                                        className='w-24'
                                        onChange={(e) => handleInputChange(index, 'minutes', parseInt(e.target.value))}
                                    />
                                </div>
                            </li>
                        ))}
                    </div>
                )}
                <div className='flex items-start py-2'>
                    <label className='mr-1'>Enter Description:</label>
                    <textarea 
                        typeof='text'
                        placeholder='weekly timesheet...'
                        className='px-1 h-20 border-2 rounded-lg'
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                    />
                </div>
                <div className='pt-3'>
                    <label>Set Hourly Rate: </label>
                    <a>$</a>
                    <input 
                        type='text'
                        placeholder='25'
                        className='w-10 text-center border-2'
                        onChange={(e) => handleRateChange(parseInt(e.target.value))}
                    />
                    <a> / hour</a>
                </div>
            </div>

            <div className='flex flex-col items-center justify-between w-full max-w-[40rem]'>
                <motion.button 
                        onClick={handleSubmit}
                        className='bg-slate-200 font-bold my-16 w-full max-w-40 py-2 rounded-md'
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgb(206 202 210)' }}
                    >
                        Submit
                </motion.button>

                <ToDashButton />
            </div>
        </main>
    )
}

export default page