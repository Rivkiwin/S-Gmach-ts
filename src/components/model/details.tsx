import React from 'react'
import { details } from '../../modles/details.modle'

interface Prop{
    doc:details
}

const Details = ({doc}:Prop) => {


    return (
        <div>
            {
                doc?.rows?.map(r => {
                    return (
                        <div className={'row'}>
                            {r.cals.map(c => {
                                return (
                              <div className={'cal'}>
                                  <span className={'blod'}>{c.name} : </span>  
                                  <span>{c.value}</span>
                              </div>
                          )
                            })}
                        </div>)
                })
            }
        </div>
    )

}

export default Details;