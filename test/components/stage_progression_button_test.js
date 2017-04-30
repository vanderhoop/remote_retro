import React from "react"
import { mount } from "enzyme"
import sinon from "sinon"

import StageProgressionButton from "../../web/static/js/components/stage_progression_button"
import RetroRestClient from "../../web/static/js/clients/retro_rest_client"

describe("StageProgressionButton", () => {
  const mockStageProgressionConfigs = {
    stageUno: {
      confirmationMessage: "Are you sure?",
      nextStage: "stageDos",
      buttonConfig: {
        copy: "Proceed to stage dos",
        iconClass: "arrow right",
      },
    },
    stageDos: {
      confirmationMessage: null,
      nextStage: "stageTres",
      buttonConfig: {
        copy: "blurg!",
        iconClass: "send",
      },
    },
  }

  const defaultProps = {
    RetroRestClient,
    stage: "stageUno",
    stageProgressionConfigs: mockStageProgressionConfigs,
  }

  let stageProgressionButton

  beforeEach(() => {
    stageProgressionButton = mount(
      <StageProgressionButton {...defaultProps} />
    )
  })

  it("displays the button text from the matching stage config", () => {
    expect(stageProgressionButton.text()).to.match(/proceed to stage dos/i)
  })

  it("uses the icon class from the matching stage config", () => {
    expect(stageProgressionButton.find("i").hasClass("arrow")).to.equal(true)
  })

  context("onClick", () => {
    let httpStub

    beforeEach(() => {
      httpStub = sinon.stub(RetroRestClient, "put")
    })

    afterEach(() => {
      httpStub.restore()
    })

    context("when the stage progression config requires confirmation", () => {
      let stageProgressionButton
      let confirmStub

      beforeEach(() => {
        stageProgressionButton = mount(
          <StageProgressionButton {...defaultProps} stage="stageUno" />
        )
      })

      it("invokes a javascript confirmation", () => {
        confirmStub = sinon.stub(global, "confirm")
        stageProgressionButton.simulate("click")
        expect(confirmStub.called).to.equal(true)

        confirmStub.restore()
      })

      context("when the user confirms", () => {
        beforeEach(() => {
          confirmStub = sinon.stub(global, "confirm")
        })

        afterEach(() => {
          confirmStub.restore()
        })

        it("fires a PUT request to the retro's REST endpoint", () => {
          confirmStub.returns(true)
          stageProgressionButton.simulate("click")
          expect(httpStub.calledWith({ stage: "stageDos" })).to.equal(true)
          httpStub.restore()
        })
      })

      context("when the user does not confirm", () => {
        it("does not fire a PUT request to the retro's REST endpoint", () => {
          confirmStub.returns(false)
          stageProgressionButton.simulate("click")
          expect(httpStub.called).to.equal(false)
          httpStub.restore()
        })
      })
    })

    context("when the matching stage config lacks a `confirmationMessage`", () => {
      let confirmSpy
      let stageProgressionButton

      beforeEach(() => {
        confirmSpy = sinon.spy(global, "confirm")

        const props = { ...defaultProps, stage: "stageDos" }
        stageProgressionButton = mount(<StageProgressionButton {...props} />)

        stageProgressionButton.simulate("click")
      })

      it("does not invoke a javascript confirmation", () => {
        expect(confirmSpy.called).to.equal(false)
        confirmSpy.restore()
      })
    })
  })
})
