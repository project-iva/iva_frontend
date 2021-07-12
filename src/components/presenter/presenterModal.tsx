import React, { FunctionComponent } from 'react'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

type PresenterModalProps = {
  show: boolean
  showFinished: boolean
  title: React.ReactNode
  body: React.ReactNode
}

export const PresenterModal: FunctionComponent<PresenterModalProps> = (
  props: PresenterModalProps,
) => {
  let finishedIcon = (
    <FontAwesomeIcon size="10x" icon={faCheckCircle} color={'green'} />
  )
  return (
    <>
      <Modal
        show={props.show}
        animation={false}
        centered
        className={'routineModal'}
        contentClassName={'content'}
      >
        <Modal.Header className={'header'}>
          <Modal.Title>
            {props.showFinished ? <h1>Finished</h1> : props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={'body'}>
          {props.showFinished ? finishedIcon : props.body}
        </Modal.Body>
      </Modal>
    </>
  )
}
