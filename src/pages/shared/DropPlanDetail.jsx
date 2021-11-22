/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { ArrowDownOutline, ArrowUpOutline } from 'react-ionicons';

const DropPlanDetail = ({
  show, setShow, title, items, setItems,
}) => {
  const itemsArray = Object.keys(items);

  const getCheckboxTitle = (option) => {
    let optionTitle;
    switch (option) {
      case 'weekly':
        optionTitle = 'Semanal';
        break;
      case 'monthly':
        optionTitle = 'Mensal';
        break;
      case 'monday':
        optionTitle = 'Segunda-feira';
        break;
      case 'wednesday':
        optionTitle = 'Quarta-feira';
        break;
      case 'friday':
        optionTitle = 'Sexta-feira';
        break;
      case 'day01':
        optionTitle = 'Dia 01';
        break;
      case 'day10':
        optionTitle = 'Dia 10';
        break;
      case 'day20':
        optionTitle = 'Dia 20';
        break;
      case 'tea':
        optionTitle = 'Chás';
        break;
      case 'incense':
        optionTitle = 'Incensos';
        break;
      case 'organics':
        optionTitle = 'Produtos orgânicos';
        break;
      default:
        break;
    }
    return optionTitle;
  };

  const toggleCheckbox = (prop) => {
    setItems({ ...items, [prop]: !items[prop] });
  };

  const clearAndSetCheckbox = (prop) => {
    const newItemsStates = {};
    itemsArray.forEach((item) => {
      if (item === prop) {
        newItemsStates[item] = true;
      } else {
        newItemsStates[item] = false;
      }
    });
    setItems(newItemsStates);
  };

  const handleCheckboxChange = (prop) => {
    if (setItems) {
      if (title === 'Entrega') {
        clearAndSetCheckbox(prop);
      } else {
        toggleCheckbox(prop);
      }
    }
  };

  return (
    <PlanDetail show={show} onClick={() => setShow((value) => !value)}>
      <TitleWrapper>
        <DetailTitle>{title}</DetailTitle>
        <ArrowButton onClick={() => setShow((value) => !value)}>
          {!show
            ? (
              <ArrowDownOutline
                color="#4D65A8"
                height="30px"
                width="30px"
                onClick={() => setShow((value) => !value)}
              />
            )
            : (
              <ArrowUpOutline
                color="#4D65A8"
                height="30px"
                width="30px"
                onClick={() => setShow((value) => !value)}
              />
            )}
        </ArrowButton>
      </TitleWrapper>
      <OptionsWrapper>
        {itemsArray.map((item) => (
          <Option key={item}>
            <Checkbox
              checked={items[item]}
              onClick={
                (e) => {
                  e.stopPropagation();
                  handleCheckboxChange(item);
                }
              }
            />
            <OptionTitle onClick={
              (e) => {
                e.stopPropagation();
                handleCheckboxChange(item);
              }
            }
            >
              {getCheckboxTitle(item)}

            </OptionTitle>
          </Option>
        ))}
      </OptionsWrapper>
    </PlanDetail>
  );
};

export default DropPlanDetail;

const PlanDetail = styled.div`
  width: 100%;
  height: ${(props) => (props.show ? '111px' : '44px')};
  background-color: #E0D1ED9E;
  border-radius: 5px;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  font-size:18px;
  color: #4D65A8;
  cursor: pointer;
  position: relative;
  left: 0;
  top: 0;
  transition: all 450ms ease-out;
  margin-bottom: 8px;
  overflow: hidden;
`;

const ArrowButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
`;

const DetailTitle = styled.span`
  font-weight: 700;
  position: relative;
  top: 12px;
  left: 0;
`;

const TitleWrapper = styled.span`
  margin-bottom:30px
`;

const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #4D65A8;
  background-color: ${(props) => (props.checked ? '#4D65A8' : 'white')};
  transition: all 450ms ease-out;
  margin-right: 5px;
`;

const Option = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`;

const OptionTitle = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: inherit;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
