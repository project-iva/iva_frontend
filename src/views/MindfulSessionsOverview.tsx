import React, { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchMindfulSessions } from '../store/mindfulSessionsSlice'

export const MindfulSessionsOverview: FunctionComponent = () => {
  const mindfulSessions = useAppSelector(
    (state) => state.mindfulSessions.mindfulSessions,
  )
  const mindfulSessionsStatus = useAppSelector(
    (state) => state.mindfulSessions.status,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (mindfulSessionsStatus === 'idle') {
      dispatch(fetchMindfulSessions())
    }
  }, [mindfulSessionsStatus, dispatch])

  console.log(mindfulSessions)

  return (
    <aside>
      <h2>a</h2>
    </aside>
  )
}
