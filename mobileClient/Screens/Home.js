/* eslint-disable react/style-prop-object */
import React from 'react';
// import Logo from '../assets/images/evergreen-pine-tree-logo-design-inspiration-evergreen-pine-tree-logo-design-inspiration-vector-134609964.jpg';
import CategoryWrapper from '../components/Custom/CategoryWrapper';
import ResponseScreen from '../components/Ui/ResponseScreen';

export default function Home() {
  /**
   * Navigate --helpers
   *** navigation.goBack()
   *** navigation.navigate()
   *** navigation.push()
   *** navigation.pop()
   */
  const Content = () => (
<><CategoryWrapper></CategoryWrapper>
  <CategoryWrapper></CategoryWrapper>
  </>
  );

  return (
  <ResponseScreen ChildComponent={() => (<Content />)}>

 </ResponseScreen>
  );
}
