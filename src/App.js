/* global window */
import React, { Component } from 'react'
import { css } from 'emotion'

const styles = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

class App extends Component {
    // state = {
    //     m: 11
    // }

    // render() {
    //     const { m } = this.state
    //     const a = (360 / m) * Math.PI / 180
    //     const x = 110 + 100 * Math.cos(a)
    //     const y = 110 - 100 * Math.sin(a)
    //     console.log(x)
    //     console.log(y)
    //     return (
    //         <svg className={svgStyles} width="220" height="220">
    //             <circle cx="110" cy="110" r="100" stroke="red" strokeWidth="2" fill="none" />
    //             <circle cx={x} cy={y} r="4" fill="blue" />

    //         </svg>
    //     )
    // }

    constructor(props) {
        super(props)
        this.canvas = React.createRef()
        this.size = 300
        this.extra = 4
        this.radius = 150
        this.angleInc = 3
    }

    componentDidMount() {
        window.requestAnimationFrame(() => this.draw(0))
    }

    degToRad = deg => deg * Math.PI / 180

    draw = (angle) => {
        const canvas = this.canvas.current
        const ctx = canvas.getContext('2d')

        ctx.clearRect(0, 0, this.size + this.extra, this.size + this.extra)
        ctx.beginPath()
        // ctx.moveTo(150, 150)
        // ctx.lineTo(300, 150)
        ctx.arc(
            this.radius + this.extra / 2,
            this.radius + this.extra / 2,
            this.radius,
            0,
            this.degToRad(angle),
            false
        )
        // ctx.lineTo(150, 150)
        ctx.strokeStyle = '#189309'
        ctx.lineWidth = 4
        ctx.stroke()
        if (angle <= 360) {
            window.requestAnimationFrame(() => this.draw(angle + this.angleInc))
        }

        const a = this.degToRad(360 / 11)
        const x = this.radius + this.extra / 2 + this.radius * Math.cos(a)
        const y = this.radius + this.extra / 2 - this.radius * Math.sin(a)

        ctx.beginPath()
        ctx.arc(x, y, 5, 0, 2 * Math.PI, false)
        ctx.strokeStyle = '#a79877'
        ctx.stroke()
    }

    render() {
        return (
            <canvas
                className={styles}
                ref={this.canvas}
                width={this.size + this.extra}
                height={this.size + this.extra}
            />
        )
    }
}

export default App
