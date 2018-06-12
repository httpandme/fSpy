import * as React from 'react'
import { SettingsContainerProps } from '../../containers/settings-container'
import { PrincipalPointMode2VP } from '../../types/calibration-settings'
import Checkbox from './checkbox'
import Dropdown from './../common/dropdown'
import AxisDropdown from './axis-dropdown'
import PanelSpacer from './../common/panel-spacer'
import ReferenceDistanceForm from './reference-distance-form'

export default class SettingsSection2VP extends React.PureComponent<SettingsContainerProps> {
  render() {
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
                  label: 'Image midpoint'
                },
                {
                  value: PrincipalPointMode2VP.Manual,
                  id: PrincipalPointMode2VP.Manual,
                  label: PrincipalPointMode2VP.Manual
                },
                {
                  value: PrincipalPointMode2VP.FromThirdVanishingPoint,
                  id: PrincipalPointMode2VP.FromThirdVanishingPoint,
                  label: 'From 3rd vanishing point'
                }
              ]
            }
            selectedOptionId={this.props.calibrationSettings2VP.principalPointMode}
            onChange={(selectedValue: PrincipalPointMode2VP) => {
              this.props.onPrincipalPointModeChange2VP(selectedValue)
            }}
          />
        </div>

        <PanelSpacer />
        <div className='panel-row'>
          Vanishing point axes
        </div>

        <div className='panel-row'>
          <AxisDropdown
            selectedAxis={this.props.calibrationSettingsBase.firstVanishingPointAxis}
            onChange={this.props.onFirstVanishingPointAxisChange}
          />
        </div>
        <PanelSpacer />
        <div className='panel-row'>
          <AxisDropdown
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
          onReferenceAxisChange={ this.props.onReferenceDistanceAxisChange }
          onReferenceDistanceChange={ this.props.onReferenceDistanceChange }
          onReferenceDistanceUnitChange={ this.props.onReferenceDistanceUnitChange }
        />

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