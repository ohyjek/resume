export type MeetingInterval = [start: number, end: number];
export type MeetingRoomsIiInput = MeetingInterval[];
export type MeetingRoomsIiOutput = number;

/**
 * Learning goals
 * 1) Reframe interval scheduling as max-overlap counting.
 * 2) Keep pointer invariants clear in a sweep-line pass.
 * 3) Defend boundary behavior when meetings touch.
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
      maxRooms = Math.max(maxRooms, roomsInUse);
    } else {
      endPtr += 1;
    }
  }

  return maxRooms;
}

/**
 * Suggested tests
 * - [[0,30],[5,10],[15,20]] => 2
 * - [] => 0
 * - [[1,2],[2,3],[3,4]] => 1
 * - [[1,10],[2,9],[3,8]] => 3
 */

