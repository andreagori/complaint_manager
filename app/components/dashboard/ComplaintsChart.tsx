/**
 * ComplaintsChart Component
 * 
 * Renders a line and area chart showing the number of complaints over time.
 * Uses D3 for scales, line/area generation, and interactive tooltips.
 * 
 * Client-side only:
 * - Requires "use client" because it uses React hooks indirectly via rendering interactive tooltips 
 *   and DOM measurements, and D3 calculations run in the browser.
 * 
 * Props:
 * - complaints: array of Complaint objects to visualize.
 * - title: optional string for the chart title (default: "Complaints Over Time").
 * 
 * Behavior:
 * - Groups complaints by hour, sorts chronologically.
 * - Draws a line and shaded area to represent complaint counts.
 * - Adds interactive tooltips on hover for each point.
 * - Handles single-day or multi-day data formatting for tooltip labels.
 */

"use client";

import {
  scaleTime,
  scaleLinear,
  line as d3line,
  max,
  area as d3area,
  curveMonotoneX,
} from "d3";
import type { Complaint } from "../../../types/complaint";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

interface ComplaintsChartProps {
  complaints: Complaint[];
  title?: string;
}

export function ComplaintsChart({
  complaints,
  title = "Complaints Over Time",
}: ComplaintsChartProps) {
  if (!complaints || complaints.length === 0) {
    return (
      <div
        className="bg-white rounded-2xl p-6 shadow-lg border-2"
        style={{ borderColor: "var(--purple)" }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
        <div className="h-72 flex items-center justify-center text-gray-400">
          <p>No complaints data available</p>
        </div>
      </div>
    );
  }

  // Agrupar por hora
  const groupedData: { [key: string]: number } = {};
  complaints.forEach((complaint) => {
    const date = new Date(complaint.created_at);
    const hourKey = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours()
    ).toISOString();
    groupedData[hourKey] = (groupedData[hourKey] || 0) + 1;
  });

  const data = Object.entries(groupedData)
    .map(([dateTime, value]) => ({
      date: new Date(dateTime),
      value,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (data.length === 0) return null;

  const xScale = scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, 100]);

  const yScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([100, 0]);

  const line = d3line<typeof data[0]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  const area = d3area<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y0(yScale(0))
    .y1((d) => yScale(d.value))
    .curve(curveMonotoneX);

  const areaPath = area(data) ?? undefined;
  const d = line(data);
  if (!d) return null;

  const firstDate = data[0].date;
  const lastDate = data[data.length - 1].date;
  const sameDay = firstDate.toDateString() === lastDate.toDateString();

  return (
    <div
      className="bg-white rounded-2xl p-6 shadow-lg border-2"
      style={{ borderColor: "var(--purple)" }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>

      <div className="relative h-72 w-full">
        <div className="absolute inset-0 h-full w-full overflow-visible">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="complaintsGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--purple)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--purple)" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Área rellena */}
            <path d={areaPath} fill="url(#complaintsGradient)" />

            {/* Línea */}
            <path
              d={d}
              fill="none"
              stroke="var(--purple)"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Tooltip Interactivo */}
            {data.map((point, index) => (
              <ClientTooltip key={index}>
                <TooltipTrigger>
                  <g className="group/tooltip">
                    {/* Línea vertical visible al hover */}
                    <line
                      x1={xScale(point.date)}
                      y1={0}
                      x2={xScale(point.date)}
                      y2={100}
                      stroke="currentColor"
                      strokeWidth={1}
                      className="opacity-0 group-hover/tooltip:opacity-100 text-zinc-300 transition-opacity"
                      vectorEffect="non-scaling-stroke"
                      style={{ pointerEvents: "none" }}
                    />
                    {/* Área invisible para detectar hover */}
                    <rect
                      x={(() => {
                        const prevX =
                          index > 0 ? xScale(data[index - 1].date) : xScale(point.date);
                        return (prevX + xScale(point.date)) / 2;
                      })()}
                      y={0}
                      width={(() => {
                        const prevX =
                          index > 0 ? xScale(data[index - 1].date) : xScale(point.date);
                        const nextX =
                          index < data.length - 1
                            ? xScale(data[index + 1].date)
                            : xScale(point.date);
                        const leftBound = (prevX + xScale(point.date)) / 2;
                        const rightBound = (xScale(point.date) + nextX) / 2;
                        return rightBound - leftBound;
                      })()}
                      height={100}
                      fill="transparent"
                    />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    {sameDay
                      ? point.date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : point.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                        })}
                  </div>
                  <div className="text-gray-500 text-sm">{point.value}</div>
                </TooltipContent>
              </ClientTooltip>
            ))}
          </svg>

          {/* Etiquetas del eje X */}
          {data.map((point, i) => {
            if (i % Math.ceil(data.length / 6) !== 0 && i !== data.length - 1) return null;
            return (
              <div
                key={i}
                style={{
                  left: `${xScale(point.date)}%`,
                  top: "90%",
                }}
                className="absolute text-xs text-zinc-500 -translate-x-1/2"
              >
                {sameDay
                  ? point.date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : point.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })}
              </div>
            );
          })}
        </div>

        {/* Etiquetas del eje Y */}
        {yScale.ticks(5).map((tick, i) => {
          if (tick === 0) return null;
          return (
            <div
              key={i}
              style={{
                top: `${yScale(tick)}%`,
                right: "3%",
              }}
              className="absolute text-xs tabular-nums text-zinc-400 -translate-y-1/2"
            >
              {tick}
            </div>
          );
        })}
      </div>
    </div>
  );
}
