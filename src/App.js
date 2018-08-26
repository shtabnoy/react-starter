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
        this.angleInc = 3
        this.angles = []
        this.angleColors = {}
        this.x = 90
        this.m = 7
        this.unitAngle = 360 / this.m
        this.result = 0
        this.counter = 0
    }

    componentDidMount() {
        this.ctx = this.canvasRef.current.getContext('2d')
        this.reset()
    }

    startAnimation = () => {
        window.requestAnimationFrame(() => this.draw(0))
    }

    reset = () => {
        this.angles = []
        this.angleColors = {}
        this.result = 0
        let angle = 0
        this.counter = 0
        while (Math.round(angle) < 360) {
            this.angles.push(angle)
            this.angleColors[angle] = '#189309'
            angle += this.unitAngle
        }
        this.ctx.clearRect(0, 0, this.size + this.extra, this.size + this.extra)
        this.drawCircle(360, false, '#189309')
        this.drawText(`${this.x} mod ${this.m} = ${'?'}`)
        this.drawCirclesWithText()
    }

    draw = (angle) => {
        if (this.x === 0) {
            this.ctx.clearRect(0, 0, this.size + this.extra, this.size + this.extra)
            this.drawText(`${this.x} mod ${this.m} = ${this.result}`)
            this.drawCircle(360, false, '#189309')
            this.drawCirclesWithText(0)
        }
        if (this.counter < this.x) {
            this.ctx.clearRect(0, 0, this.size + this.extra, this.size + this.extra)

            if (angle >= this.unitAngle * (this.result + 1)) {
                this.result = (this.result += 1) % this.m
                this.counter += 1
            }
            this.drawText(`${this.x} mod ${this.m} = ${this.result}`)

            if (angle <= 360) this.drawCircle(angle, true, '#189309')
            this.drawCircle(angle % 360, false, '#f27899')
            this.drawCirclesWithText(angle % 360)

            window.requestAnimationFrame(() => this.draw(angle % 360 + this.angleInc))
        }
    }

    drawText = (equationText) => {
        this.ctx.fillStyle = 'black'
        const size = 18
        this.ctx.font = `${size}px Helvetica`
        const metrics = this.ctx.measureText(equationText)
        this.ctx.fillText(
            equationText,
            this.size / 2 + this.extra / 2 - metrics.width / 2,
            this.size / 2 + this.extra / 2
        )
    }

    drawCirclesWithText = (angle) => {
        // small circles
        let inc = 0
        this.angles.forEach((a) => {
            if (angle >= a) {
                this.angleColors[a] = '#f27899'
            } else {
                this.angleColors[a] = '#189309'
            }
            const x = this.radius + this.extra / 2 + this.radius * Math.cos(this.degToRad(a))
            const y = this.radius + this.extra / 2 + this.radius * Math.sin(this.degToRad(a))
            this.ctx.beginPath()
            this.ctx.arc(x, y, 10, 0, 2 * Math.PI, false)
            this.ctx.strokeStyle = this.angleColors[a]
            this.ctx.fillStyle = 'white'
            this.ctx.stroke()
            this.ctx.fill()

            this.ctx.fillStyle = this.angleColors[a]
            const size = 14
            this.ctx.font = `${size}px Helvetica`
            const text = inc % this.m
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
                <button type="button" onClick={this.reset}>Reset</button>
            </Fragment>
        )
    }
}

export default App
