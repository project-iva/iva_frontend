import React, { FunctionComponent } from 'react'
import { Modal } from 'react-bootstrap'
import Switch from 'react-switch'

type SettingsModalProps = {
  show: boolean
  onHide: () => void
  isPresenter: boolean
  onIsPresenterChanged: (isPresenter: boolean) => void
}

export const SettingsModal: FunctionComponent<SettingsModalProps> = (
  props: SettingsModalProps,
) => {
  return (
    <>
      <Modal
        show={props.show}
        animation={false}
        centered
        className={'settingsModal'}
        contentClassName={'content'}
        onHide={props.onHide}
      >
        <Modal.Header>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'body'}>
          <div className={'row'}>
            <div className={'col'}>
              <span>This instance is a presenter</span>
            </div>
            <div className={'col'}>
              <Switch
                className={'float-right'}
                onChange={props.onIsPresenterChanged}
                checked={props.isPresenter}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
