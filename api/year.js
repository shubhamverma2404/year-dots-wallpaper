import { createCanvas, registerFont } from "canvas"
import path from "path"

registerFont(
  path.join(process.cwd(), "fonts/DejaVuSans-ExtraLight.ttf"),
  { family: "DejaVuSans" }
)

// ===== CONFIG =====
const WIDTH = 2560
const HEIGHT = 1600
const DOT_SIZE = 18
const GAP = 16
const COLUMNS = 26

const BG_COLOR = "#0b0b0b"
const PAST_COLOR = "#ffffff"
const FUTURE_COLOR = "#555555"
const TODAY_COLOR = "#0a84ff"

export default function handler(req, res) {
  // ===== DATE LOGIC =====
  const today = new Date()
  const year = today.getFullYear()

  const startOfYear = new Date(year, 0, 1)
  const dayOfYear =
    Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1

  const isLeapYear =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

  const totalDays = isLeapYear ? 366 : 365

  const daysLeft = totalDays - dayOfYear
  const percentDone = Math.floor((dayOfYear / totalDays) * 100)

  // ===== CANVAS =====
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext("2d")

  // Background
  ctx.fillStyle = BG_COLOR
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // Grid math
  const rows = Math.ceil(totalDays / COLUMNS)
  const gridWidth = COLUMNS * (DOT_SIZE + GAP) - GAP
  const gridHeight = rows * (DOT_SIZE + GAP) - GAP

  const startX = (WIDTH - gridWidth) / 2
  const startY = (HEIGHT - gridHeight) / 2

  // ===== DRAW DOTS =====
  for (let day = 1; day <= totalDays; day++) {
    const index = day - 1
    const row = Math.floor(index / COLUMNS)
    const col = index % COLUMNS

    const x = startX + col * (DOT_SIZE + GAP)
    const y = startY + row * (DOT_SIZE + GAP)

    ctx.beginPath()
    ctx.arc(
      x + DOT_SIZE / 2,
      y + DOT_SIZE / 2,
      DOT_SIZE / 2,
      0,
      Math.PI * 2
    )

    if (day < dayOfYear) {
      ctx.fillStyle = PAST_COLOR
      ctx.fill()
    } else if (day === dayOfYear) {
      ctx.fillStyle = TODAY_COLOR
      ctx.fill()
    } else {
      ctx.strokeStyle = FUTURE_COLOR
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  // ===== YEAR ABOVE GRID =====
  const yearText = String(year)

  ctx.fillStyle = "#8a8a8a"
  ctx.font = "24px DejaVuSans-ExtraLight" // slightly bigger than bottom text
  ctx.textAlign = "center"

  ctx.fillText(yearText, WIDTH / 2, startY - 60)

  // ===== TEXT =====
  const text = `${daysLeft}d left . ${percentDone}%`

  ctx.fillStyle = "#8a8a8a"
  ctx.font = "24px DejaVuSans-ExtraLight"
  ctx.textAlign = "center"

  ctx.fillText(text, WIDTH / 2, startY + gridHeight + 60)

  // ===== RESPONSE =====
  const buffer = canvas.toBuffer("image/png")

  res.setHeader("Content-Type", "image/png")
  res.setHeader("Cache-Control", "no-store") // IMPORTANT
  res.status(200).send(buffer)
}