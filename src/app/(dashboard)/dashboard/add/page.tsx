'use client'
import ToDashButton from '@/components/ToDashButton'
import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, PlusSquare, XSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'


const Page: FC = ({}) => {

    const [totalTime, setTotalTime] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false)
    const [lineItems, setLineItems] = useState<LineItem[]>([ {date: '', minutes: 0 }])
    const [description, setDescription] = useState<string>()
    const [rate, setRate] = useState<number>()
    const [timeSheet, setTimeSheet] = useState<TimeSheet>({
        lineItems: lineItems,
        description: '',
        rate: NaN,
        totalTime: 0,
        totalCost: 0
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

    // Function for changing line item values for database when user changes them on the page
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

    // Posts timesheet to Redis database when 'Submit' btn. is clicked
    const handleSubmit = async () => {
        if ( description === undefined || rate === undefined ) {
            toast.error("Please fill in required forms")
        } else {
            // [UI for user] loading submission
            setShowSuccessState(false);
            try {
                await axios.post('/api/timesheet/add', {
                    timeSheet: timeSheet
                })
                // Refresh page once current timesheet is submitted
                window.location.reload()    
            } catch (error) {
                toast.error("Error saving timesheet to database.")
            } finally {
                // [UI for user] finished loading
                setShowSuccessState(true) 
            }
        }
    }

    // Calculate total time whenever lineItems change
    useEffect(() => {
        const calculatedTotalTime = timeSheet.lineItems.reduce((total, item) => total + item.minutes, 0);
        setTotalTime(calculatedTotalTime);
        setTimeSheet((timeSheet) => ({
            ...timeSheet,
            totalTime: calculatedTotalTime
        }))
        // timeSheet.totalTime = calculatedTotalTime
      }, [timeSheet.lineItems]);
    

    // Calculate total cost whenever rate or total time changes
    // Round to second decimal point for UI clarity and reconvert from string back to float
    useEffect(() => {
        const calculatedTotalCost = parseFloat(((totalTime * timeSheet.rate) / 60).toFixed(2))
        setTotalCost(calculatedTotalCost);
        // timeSheet.totalCost = calculatedTotalCost
        setTimeSheet((prevTimeSheet) => ({
            ...prevTimeSheet,
            totalCost: calculatedTotalCost
          }));
      }, [totalTime, timeSheet.rate]);
    
    
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
                                    <a className='mx-2'>minutes:</a>
                                    <input
                                        type='number'
                                        placeholder='60' 
                                        className='w-24'
                                        onChange={(e) => handleInputChange(index, 'minutes', parseFloat(e.target.value))}
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
                        type='number'
                        placeholder='25'
                        className='w-16 text-center border-2'
                        onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                    />
                    <a> / hour</a>
                </div>
                <div>
                    Total Time: {isNaN(totalTime) ? 0 : totalTime} minutes
                </div>
                <div>
                    Total Cost: ${isNaN(totalCost) ? 0 : totalCost}
                </div>
            </div>

            <div className='flex flex-col items-center justify-between w-full max-w-[40rem]'>
                <motion.button 
                        onClick={handleSubmit}
                        className='flex items-center justify-center bg-slate-200 font-bold my-16 w-full max-w-40 py-2 rounded-md'
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgb(206 202 210)' }}
                    >
                        {showSuccessState ? (
                            <Loader2 className='animate-spin' />
                        ): (
                            <a>Submit</a>
                        )}
                </motion.button>

                <ToDashButton />
            </div>
        </main>
    )
}

export default Page