import { connect } from 'react-redux';
import * as routes from 'app/routes';
import InsuranceConfirm from './InsuranceConfirm';
import { getInsurancePlan } from 'reducers';
import { find as findInsurancePlan } from 'insurance/insurancePlans/actions';
import { createContract } from 'insurance/insuranceContracts/actions';

const mapStateToProps = (state, { subId, insPlanId, sku }) => ({
  subId,
  insurancePlan: getInsurancePlan(state, insPlanId),
  sku,
  insPlanId,
  isSprint: false,
});

const mapDispatchToProps = {
  findInsurancePlan,
  createContract,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceConfirm);
