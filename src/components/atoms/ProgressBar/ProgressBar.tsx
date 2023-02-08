import React from 'react';

type Props = {
  min: number;
  max: number;
}
export default function ProgressBar({ min = 0, max = 10 }: Props) {
  return (
    <div className="ProgressBar">
      <div className="ProgressBar__bar" style={{ width: `${(min / max) * 100}%` }} />
    </div>
  );
}
