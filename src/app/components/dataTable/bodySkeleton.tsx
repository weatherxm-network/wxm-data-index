import {
  TableBody,
  TableCell,
  TableRow
} from "@tremor/react";

const mockedRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const BodySkeleton = () => (
  <TableBody>
    {mockedRows.map((row) => (
      <TableRow key={row}>
        <TableCell width='20%'>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 mt-1 mb-1 rounded"></div>
          </div>
        </TableCell>
        <TableCell width='70%'>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 mt-1 mb-1 rounded"></div>
          </div>
        </TableCell>
        <TableCell width='10%'>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 mt-1 mb-1 rounded"></div>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
)

export default BodySkeleton;