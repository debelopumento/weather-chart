import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import { mount, shallow, render } from 'enzyme'
import App from '../components/app'


it('renders app root without crashing', () => {
 	expect(shallow(<App />).hasClass('App')).to.equal(true)
})

