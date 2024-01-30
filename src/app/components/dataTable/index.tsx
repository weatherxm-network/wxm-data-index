'use client';
import { useState, useEffect } from "react";
import { useContractReads } from 'wagmi'
import copy from 'copy-to-clipboard';
import BasinStorage from '../../../contracts/BasinStorage.json'
import { filecoinCalibration } from 'viem/chains'
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
  Tab,
  TabGroup,
  TabList,
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
  Grid,
  Col,
  Button
} from "@tremor/react";
import Image from 'next/image'
import BodySkeleton from "./bodySkeleton";
import Copy from '../../../../public/copy.svg'
import OpenNew from '../../../../public/open-new.svg'

export type Row = {
  CID: string | undefined,
  date: string,
}

const ROWS_PER_PAGE = 10

const options = [
  {
    value: process.env.NEXT_PUBLIC_WXM_DATA_KEY,
    label: 'Weather Data'
  },
  {
    value: process.env.NEXT_PUBLIC_WXM_REWARDS_MERKLE_TREE_KEY,
    label: 'Rewards'
  }
]

const unixTimestampToDateString = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds

  const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month (0-based) and pad with leading zero if necessary
  const year = date.getUTCFullYear(); // Get year

  return `${year}-${month}-${day}`;
}

const DataTable = () => {
  const [range, setRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000), // Default from date, 7 days ago
    to: new Date(), // Default to date, current date
  });
  const [rows, setRows] = useState<Row[]>([])
  const [page, setPage] = useState(0)
  const [timestamps, setTimestamps] = useState([1700438390])
  const [contractReads, setContractReads] = useState([])
  const [displayedRows, setDisplayedRows] = useState<Row[]>([])
  const [selectedOption, setSelectedOption] = useState(options[0].value)

  const { data: contractData, isLoading } = useContractReads({
    // @ts-ignore
    contracts: contractReads
  })

  useEffect(() => {
    const newDisplayedRows = rows.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
    setDisplayedRows(newDisplayedRows)
  }, [page, rows])

  useEffect(() => {
    const newRows = contractData?.map((result, index: number) => {
      if(result.status === 'success') {
        return {
          // @ts-ignore
          CID: (result.result as string[])[0],
          date: unixTimestampToDateString(timestamps[index])
        }
      }
    })

    // @ts-ignore
    setRows(newRows || [])
  }, [contractData, timestamps])

  useEffect(() => {
    if(range.from && range.to) {
      const dayMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const timestampsAtDayStart = [];
      
      let currentTimestamp = range.from!;
      currentTimestamp.setUTCHours(0, 0, 0, 0); // Start at the beginning of the "from" day
    
      while (currentTimestamp.getTime() <= range.to!.getTime()) { // Convert "to" timestamp to milliseconds
        timestampsAtDayStart.push(Math.floor(currentTimestamp.getTime() / 1000)); // Convert to seconds
        currentTimestamp = new Date(currentTimestamp.getTime() + dayMilliseconds);
      }
    
      setTimestamps(timestampsAtDayStart)
      const reads = timestampsAtDayStart.map((timestamp) => {
        return {
          address: BasinStorage.address,
          abi: BasinStorage.abi,
          functionName: 'cidsAtTimestamp',
          args: [selectedOption, [timestamp]],
          chainId: filecoinCalibration.id
        }
      })

      // @ts-ignore
      setContractReads(reads)
    }
  }, [range.from, range.to, selectedOption])

  const onNextPage = () => {
    setPage(page + 1)
  }

  const onPreviousPage = () => {
    setPage(page - 1)
  }

  const onOptionChange = (index: number) => {
    setSelectedOption(options[index].value)
  }

  const getUpToDisplay = () => {
    if (ROWS_PER_PAGE * (page + 1) <= (contractData?.length || 0)) {
      return ROWS_PER_PAGE * (page + 1)
    }

    return contractData?.length
  }

  const onCopyToClipboard = (CID: string | undefined = '') => () => {
    copy(CID);
  }

  const getPrevButtonDisabled = () => {
    return page === 0;
  }

  const getNextButtonDisabled = () => {
    return ROWS_PER_PAGE * (page + 1) >= (contractData?.length || 0);
  }

  return (
    <Card>
      <Grid numItems={1} numItemsSm={2} className="gap-2">
        <Col>
          <Title>Results</Title>
        </Col>
        <Col className="justify-start sm:justify-end flex">
          <DateRangePicker
            className="sm:max-w-md sm:mx-auto sm:mr-0"
            value={range}
            onValueChange={setRange}
            selectPlaceholder="Select"
            color="rose"
          >
            <DateRangePickerItem
              key="week"
              value="week"
              from={new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)} // Subtract 7 days in milliseconds
              to={new Date()} // Current date
            >
              Last 7 days
            </DateRangePickerItem>
            <DateRangePickerItem
              key="half"
              value="half"
              from={new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)} // Subtract 30 days in milliseconds
              to={new Date()} // Current date
            >
              Last 30 days
            </DateRangePickerItem>
          </DateRangePicker>
        </Col>
      </Grid>
        <TabGroup onIndexChange={onOptionChange} className="sm:h-[50vh] relative">
          <TabList className="mt-8">
            {options.map((option) => (
              <Tab key={option.value}>{option.label}</Tab>
            ))}
          </TabList>
          <Table className="mt-5 relative h-full">
            <TableHead className="sticky top-0 bg-white">
              <TableRow>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>CID</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            {isLoading ? <BodySkeleton/> : (
              <TableBody>
              {displayedRows.map((item, index) => (
                <TableRow key={index}>
                  <TableCell width='20%'>
                    <Text>{item.date}</Text>
                  </TableCell>
                  <TableCell width='70%'>{item.CID ?? '-'}</TableCell>
                  <TableCell width='10%' className="py-0">
                    <Grid numItems={2} className="gap-2 justify-start flex min-w-max items-center h-full">
                      {item.CID ? (
                        <Image src={Copy} alt='copy' onClick={onCopyToClipboard(item.CID)} className="h-fit cursor-pointer"/>
                      ) : null}
                      {item.CID ? (
                        <a href={`https://ipfs.io/ipfs/${item.CID}`} target="_blank">
                          <Image src={OpenNew} alt='open-new'/>
                        </a>
                      ) : null}
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            )}
          </Table>
      </TabGroup>
      <Grid numItems={1} numItemsSm={2} className="gap-2 border-t border-gray-200 pt-3 mt-20">
        <Col>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{ROWS_PER_PAGE * (page)}</span> to <span className="font-medium">{getUpToDisplay()}</span> of{' '}
            <span className="font-medium">{contractData?.length}</span> results
          </p>
        </Col>
        <Col className="justify-end flex">
          <Button size="xs" variant="secondary" className="mx-4" onClick={onPreviousPage} disabled={getPrevButtonDisabled()}>
            Previous
          </Button>
          <Button size="xs" variant="secondary" className="mr-0" onClick={onNextPage} disabled={getNextButtonDisabled()}>
            Next
          </Button>
        </Col>
      </Grid>
    </Card>
  )
}

export default DataTable;