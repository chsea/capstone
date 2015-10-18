app.directive('message', ($animate) => {
  return {
    restrict: 'E',
    template: '<div>hi</div>',
    link: (scope, el, attrs) => {
      $animate.on('enter', el, element => {
        console.log('hi');
        $animate.addClass(element, 's');
      });
   }
 };
});
