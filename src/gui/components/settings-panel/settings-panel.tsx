import * as React from 'react'
import { SettingsContainerProps } from '../../containers/settings-container'
import { CalibrationMode, Overlay3DGuide } from '../../types/global-settings'
import Overlay3DGuideDropdown from './overlay-3d-guide-dropdown'
import { PrincipalPointMode1VP, PrincipalPointMode2VP } from '../../types/calibration-settings'
import Checkbox from './checkbox'
import PanelSpacer from './../common/panel-spacer'
import ReferenceDistanceForm from './reference-distance-form'
import AxisDropdown from './axis-dropdown'
import FocalLengthForm from './../common/focal-length-form'
import Dropdown from '../common/dropdown'
import { Palette } from '../../style/palette'

export default class SettingsPanel extends React.PureComponent<SettingsContainerProps> {
  render() {
    return (
      <div id='left-panel' className='side-panel'>
        <div id='panel-container'>
          <div>
            <div className='panel-section bottom-border'>
              <div className='panel-row'>Number of vanishing points</div>
              <Dropdown
                options={[
                  {
                    value: CalibrationMode.OneVanishingPoint,
                    id: CalibrationMode.OneVanishingPoint,
                    title: '1'
                  },
                  {
                    value: CalibrationMode.TwoVanishingPoints,
                    id: CalibrationMode.TwoVanishingPoints,
                    title: '2'
                  }
                ]}
                selectedOptionId={this.props.globalSettings.calibrationMode}
                onOptionSelected={(selectedValue: CalibrationMode) => {
                  this.props.onCalibrationModeChange(selectedValue)
                }}
              />
            </div>
            <div className='panel-section'>
              <div className='panel-row'>
                Vanishing point axes
              </div>

              <div className='panel-row' style={{ display: 'flex' }}>
                <span style={{ paddingRight: 8, paddingLeft: 6 }}>1</span><AxisDropdown
                  selectedAxis={this.props.calibrationSettingsBase.firstVanishingPointAxis}
                  onChange={this.props.onFirstVanishingPointAxisChange}
                />
              </div>
              <PanelSpacer />
              <div className='panel-row' style={{ display: 'flex' }}>
                <span style={{ paddingRight: 8, paddingLeft: 6 }}>2</span><AxisDropdown
                  selectedAxis={this.props.calibrationSettingsBase.secondVanishingPointAxis}
                  onChange={this.props.onSecondVanishingPointAxisChange}
                />
              </div>
              <PanelSpacer />
              <div className='panel-row'>
                Reference distance
              </div>

              <ReferenceDistanceForm // TODO: DRY
                referenceAxis={this.props.calibrationSettingsBase.referenceDistanceAxis}
                referenceDistance={this.props.calibrationSettingsBase.referenceDistance}
                referenceDistanceUnit={this.props.calibrationSettingsBase.referenceDistanceUnit}
                onReferenceAxisChange={this.props.onReferenceDistanceAxisChange}
                onReferenceDistanceChange={this.props.onReferenceDistanceChange}
                onReferenceDistanceUnitChange={this.props.onReferenceDistanceUnitChange}
              />
            </div>
          </div>

          {this.renderModeSpecificSettings()}

          <div className='panel-section top-border'>
            <div className='panel-row'>
              <input
                name='imageIsDimmed'
                type='checkbox'
                checked={this.props.globalSettings.imageOpacity < 1}
                onChange={(event: any) => {
                  this.props.onImageOpacityChange(event.target.checked ? 0.2 : 1)
                }}
              /> Dimmed
            </div>

            <div className='panel-row'>
              3D guide
            </div>
            <div className='panel-row'>
              <Overlay3DGuideDropdown
                overlay3DGuide={this.props.globalSettings.overlay3DGuide}
                onChange={(overlay3DGuide: Overlay3DGuide) => {
                  this.props.onOverlay3DGuideChange(overlay3DGuide)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  private renderModeSpecificSettings() {
    let is1VPMode = this.props.globalSettings.calibrationMode == CalibrationMode.OneVanishingPoint
    return is1VPMode ? this.render1VPSettings() : this.render2VPSettings()
  }

  private render1VPSettings() {
    return (
      <div className='panel-section'>
        <div className='panel-row'>
          Principal point
        </div>
        <div className='panel-row'>
          <Dropdown
            options={
              [
                {
                  value: PrincipalPointMode1VP.Default,
                  id: PrincipalPointMode1VP.Default,
                  title: 'Image midpoint',
                  circleColor: Palette.principalPointColor,
                  strokeCircle: true
                },
                {
                  value: PrincipalPointMode1VP.Manual,
                  id: PrincipalPointMode1VP.Manual,
                  title: PrincipalPointMode1VP.Manual,
                  circleColor: Palette.principalPointColor
                }
              ]
            }
            selectedOptionId={this.props.calibrationSettings1VP.principalPointMode}
            onOptionSelected={(selectedValue: PrincipalPointMode1VP) => {
              this.props.onPrincipalPointModeChange1VP(selectedValue)
            }}
          />
        </div>

        <PanelSpacer />
        <div className='panel-row'>
          Camera data
        </div>

        <FocalLengthForm
          cameraData={this.props.calibrationSettingsBase.cameraData}
          absoluteFocalLength={this.props.calibrationSettings1VP.absoluteFocalLength}
          onAbsoluteFocalLengthChange={this.props.onAbsoluteFocalLengthChange1VP}
          onCameraPresetChange={this.props.onCameraPresetChange}
          onSensorSizeChange={this.props.onSensorSizeChange}
        />
      </div>
    )
  }

  private render2VPSettings() {
    return (
      <div className='panel-section'>
        <div className='panel-row'>
          Principal point
        </div>
        <div className='panel-row'>
          <Dropdown
            options={
              [
                {
                  value: PrincipalPointMode2VP.Default,
                  id: PrincipalPointMode2VP.Default,
                  title: 'Image midpoint',
                  circleColor: Palette.principalPointColor,
                  strokeCircle: true
                },
                {
                  value: PrincipalPointMode2VP.Manual,
                  id: PrincipalPointMode2VP.Manual,
                  title: PrincipalPointMode2VP.Manual,
                  circleColor: Palette.principalPointColor
                },
                {
                  value: PrincipalPointMode2VP.FromThirdVanishingPoint,
                  id: PrincipalPointMode2VP.FromThirdVanishingPoint,
                  title: 'From 3rd vanishing point',
                  circleColor: Palette.principalPointColor,
                  strokeCircle: true
                }
              ]
            }
            selectedOptionId={this.props.calibrationSettings2VP.principalPointMode}
            onOptionSelected={(selectedValue: PrincipalPointMode2VP) => {
              this.props.onPrincipalPointModeChange2VP(selectedValue)
            }}
          />
        </div>
        <PanelSpacer />
        <div className='panel-row'>
          <Checkbox
            title='Rectangle mode'
            isSelected={this.props.calibrationSettings2VP.quadModeEnabled}
            onChange={(isSelected: boolean) => this.props.onQuadModeEnabledChange(isSelected)}
          />
        </div>
      </div>
    )
  }
}
