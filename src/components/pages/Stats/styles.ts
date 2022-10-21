import styled from 'styled-components';

export const Stats = styled.div`
  padding: 1rem;
`;

export const StatsListTop = styled.div`
  grid-template-columns: 500px 1fr;
  display: grid;

@include for-phone-only {
  grid-template-columns: initial;
}
  
  @include for-phone-only {
    display: flex;
    flex-direction: column;
  }
`;

export const StatsListLarge = styled.div`
  display: block;


@include for-phone-only {
  grid-template-columns: initial;
}
`;
