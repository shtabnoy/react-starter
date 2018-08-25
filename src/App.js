/* global window */
import React, { Component, Fragment } from 'react'
import { css } from 'emotion'

const styles = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

class App extends Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.ctx = null
        this.size = 300
        this.extra = 24
        this.radius = 150
        this.angleInc = 1
        this.m = 11
        this.a = 360 / this.m
        this.arr = []
        this.angles = {}
    }

    componentDidMount() {
        this.ctx = this.canvasRef.current.getContext('2d')

        let angle = 0
        while (Math.round(angle) < 360) {
            this.arr.push(angle)
            this.angles[angle] = '#189309'
            angle += this.a
        }
        this.drawCircle(360, false, '#189309')
        this.drawCirclesWithText()
    }

    startAnimation = () => {
        window.requestAnimationFrame(() => this.draw(0))
    }

    draw = (angle) => {
        if (angle <= 360) {
            this.ctx.clearRect(0, 0, this.size + this.extra, this.size + this.extra)
            if (angle < 360) this.drawCircle(angle, true, '#189309')
            this.drawCircle(angle, false, '#f27899')
            this.drawCirclesWithText(angle)
            window.requestAnimationFrame(() => this.draw(angle + this.angleInc))
        }
    }

    drawCirclesWithText = (angle) => {
        // small circles
        let inc = 1
        this.arr.forEach((a) => {
            if (angle - this.angleInc < a && a < angle + this.angleInc) this.angles[a] = '#f27899'
            const x = this.radius + this.extra / 2 + this.radius * Math.cos(this.degToRad(a))
            const y = this.radius + this.extra / 2 + this.radius * Math.sin(this.degToRad(a))
            this.ctx.beginPath()
            this.ctx.arc(x, y, 10, 0, 2 * Math.PI, false)
            this.ctx.strokeStyle = this.angles[a]
            this.ctx.fillStyle = 'white'
            this.ctx.stroke()
            this.ctx.fill()

            this.ctx.fillStyle = this.angles[a]
            const size = 14
            this.ctx.font = `${size}px Helvetica`
            const text = inc
            const metrics = this.ctx.measureText(text)
            this.ctx.fillText(text, x - metrics.width / 2, y + 5)
            inc += 1
        })
    }

    drawCircle = (angle, anticlockwise, color) => {
        // big circle
        this.ctx.beginPath()
        this.ctx.arc(
            this.radius + this.extra / 2,
            this.radius + this.extra / 2,
            this.radius,
            0,
            this.degToRad(angle),
            anticlockwise
        )
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = 4
        this.ctx.stroke()
    }

    degToRad = deg => deg * Math.PI / 180

    render() {
        return (
            <Fragment>
                <canvas
                    className={styles}
                    ref={this.canvasRef}
                    width={this.size + this.extra}
                    height={this.size + this.extra}
                />
                <button type="button" onClick={this.startAnimation}>Click</button>
            </Fragment>
        )
    }
}

export default App
