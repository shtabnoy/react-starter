import React from 'react'
import { shallow } from 'enzyme'
import App from '../App'

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.length).toBe(1)
    expect(wrapper.find('div').text()).toBe('Hello there')
  })
})
