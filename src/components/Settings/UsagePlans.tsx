'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeftIcon, InformationCircleIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface Plan {
  id: string
  name: string
  type: string
  quantity: number
  unit: string
  tier: string
  price: number
}

export function UsagePlans() {
  const router = useRouter()
  const [selectedPlans, setSelectedPlans] = useState<Plan[]>([
    {
      id: '1',
      name: 'Helpdesk',
      type: 'tickets',
      quantity: 2000,
      unit: 'tickets/month',
      tier: 'Pro',
      price: 360
    },
    {
      id: '2',
      name: 'Automate',
      type: 'automation',
      quantity: 190,
      unit: 'automated interactions/month',
      tier: '',
      price: 180
    }
  ])

  const total = selectedPlans.reduce((sum, plan) => sum + plan.price, 0)

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          onClick={() => router.push('/settings')}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-center gap-2">
        <InformationCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          Your Voice subscription will have to be reviewed by our team before you can start using it
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Select Plans</h2>
              <Button variant="link" className="text-blue-600">
                See Plans Details
              </Button>
            </div>

            <div className="space-y-4">
              {selectedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="border rounded-lg p-4 bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {plan.type === 'tickets' ? (
                          <div className="w-5 h-5 text-gray-400">💻</div>
                        ) : (
                          <div className="w-5 h-5 text-gray-400">⚡️</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <select
                            className="border rounded px-2 py-1 text-sm"
                            value={plan.quantity}
                            onChange={(e) => {
                              const newPlans = [...selectedPlans]
                              const index = newPlans.findIndex(p => p.id === plan.id)
                              newPlans[index] = {
                                ...plan,
                                quantity: parseInt(e.target.value)
                              }
                              setSelectedPlans(newPlans)
                            }}
                          >
                            <option value={plan.quantity}>{plan.quantity}</option>
                          </select>
                          <span className="text-sm text-gray-500">{plan.unit}</span>
                          {plan.tier && (
                            <>
                              <div className="w-1 h-1 bg-gray-300 rounded-full" />
                              <span className="text-sm">{plan.tier}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Remove plan</span>
                      ×
                    </button>
                  </div>
                </div>
              ))}

              <div className="border border-dashed rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 text-gray-400">📞</div>
                  <div>
                    <h3 className="font-medium">Voice</h3>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Add Product
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border border-dashed rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 text-gray-400">💬</div>
                  <div>
                    <h3 className="font-medium">SMS</h3>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Add Product
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border border-dashed rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 text-gray-400">💱</div>
                  <div>
                    <h3 className="font-medium">Convert</h3>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Add Product
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Summary</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>PRODUCT</span>
                  <span>PRICE</span>
                </div>
                
                {selectedPlans.map((plan) => (
                  <div key={plan.id} className="flex justify-between py-2">
                    <div>
                      <div className="font-medium">{plan.name}</div>
                      <div className="text-sm text-gray-600">
                        {plan.tier && `${plan.tier} - `}{plan.quantity} {plan.unit}
                      </div>
                    </div>
                    <div className="font-medium">
                      ${plan.price}/month
                    </div>
                  </div>
                ))}

                <div className="flex justify-between py-4 border-t mt-4">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${total}/month</span>
                </div>

                <p className="text-sm text-gray-500 text-right">
                  Prices exclusive of sales tax
                </p>
              </div>

              <Button className="w-full">
                Update Subscription
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}