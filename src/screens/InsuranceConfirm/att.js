import { connect } from 'react-redux';
import * as routes from 'app/routes';
import InsuranceConfirm from './InsuranceConfirm';
import { getInsurancePlan } from 'reducers';
import { find as findInsurancePlan } from 'insurance/insurancePlans/actions';

const mapStateToProps = (state, { subId, insPlanId, sku }) => ({
  insurancePlan: getInsurancePlan(state, insPlanId),
  sku,
  insPlanId,
});

const mapDispatchToProps = {
  findInsurancePlan,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceConfirm);
