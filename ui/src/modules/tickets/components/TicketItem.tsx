import dayjs from 'dayjs';
import Details from 'modules/boards/components/Details';
import DueDateLabel from 'modules/boards/components/DueDateLabel';
import Labels from 'modules/boards/components/label/Labels';
import EditForm from 'modules/boards/containers/editForm/EditForm';
import { ItemContainer, ItemDate } from 'modules/boards/styles/common';
import { Footer, PriceContainer, Right } from 'modules/boards/styles/item';
import { Content } from 'modules/boards/styles/stage';
import { IOptions } from 'modules/boards/types';
import { renderPriority } from 'modules/boards/utils';
import { __ } from 'modules/common/utils';
import Participators from 'modules/inbox/components/conversationDetail/workarea/Participators';
import React from 'react';
import { ITicket } from '../types';

type Props = {
  stageId: string;
  item: ITicket;
  onClick?: () => void;
  isFormVisible?: boolean;
  beforePopupClose?: () => void;
  options?: IOptions;
  portable?: boolean;
  onAdd?: (stageId: string, item: ITicket) => void;
  onRemove?: (dealId: string, stageId: string) => void;
  onUpdate?: (item: ITicket) => void;
};

class TicketItem extends React.PureComponent<Props> {
  renderDate(date, format = 'YYYY-MM-DD') {
    if (!date) {
      return null;
    }

    return <ItemDate>{dayjs(date).format('lll')}</ItemDate>;
  }

  renderForm = () => {
    const { item, isFormVisible } = this.props;

    if (!isFormVisible) {
      return null;
    }

    return (
      <EditForm
        {...this.props}
        itemId={item._id}
        hideHeader={true}
        isPopupVisible={isFormVisible}
      />
    );
  };

  renderContent() {
    const { item } = this.props;
    const { customers, companies, closeDate, isComplete } = item;

    return (
      <>
        <h5>
          {renderPriority(item.priority)}
          {item.name}
        </h5>

        <Details color="#F7CE53" items={customers || []} />
        <Details color="#EA475D" items={companies || []} />

        <PriceContainer>
          <Right>
            <Participators participatedUsers={item.assignedUsers} limit={3} />
          </Right>
        </PriceContainer>

        <DueDateLabel closeDate={closeDate} isComplete={isComplete} />

        <Footer>
          {__('Last updated')}:<Right>{this.renderDate(item.modifiedAt)}</Right>
        </Footer>
      </>
    );
  }

  render() {
    const { item, portable, onClick } = this.props;

    if (portable) {
      return (
        <>
          <ItemContainer onClick={onClick}>
            <Content>{this.renderContent()}</Content>
          </ItemContainer>
          {this.renderForm()}
        </>
      );
    }

    return (
      <>
        <Labels labels={item.labels} indicator={true} />
        <Content onClick={onClick}>{this.renderContent()}</Content>
        {this.renderForm()}
      </>
    );
  }
}

export default TicketItem;
