export type MeetingInterval = [start: number, end: number];
export type MeetingRoomsIiInput = MeetingInterval[];
export type MeetingRoomsIiOutput = number;

/**
 * Computes the minimum rooms required so no meetings overlap in one room.
 *
 * Approach:
 * - Sort all start times and end times independently.
 * - Sweep starts from left to right while tracking earliest unfinished end.
 * - Peak simultaneous active meetings is the answer.
 */
export function meetingRoomsIi(intervals: MeetingRoomsIiInput): MeetingRoomsIiOutput {
  if (intervals.length === 0) {
    return 0;
  }

  const starts = intervals.map(([start]) => start).sort((a, b) => a - b);
  const ends = intervals.map(([, end]) => end).sort((a, b) => a - b);

  let roomsInUse = 0;
  let maxRooms = 0;
  let endPtr = 0;

  for (let startPtr = 0; startPtr < starts.length; startPtr += 1) {
    if (starts[startPtr] < ends[endPtr]) {
      roomsInUse += 1;
      if (roomsInUse > maxRooms) {
        maxRooms = roomsInUse;
      }
    } else {
      // A meeting ended before (or exactly when) this one starts, reuse a room.
      endPtr += 1;
    }
  }

  return maxRooms;
}

