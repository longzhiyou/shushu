/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('informationController', InformationController);
    /* @ngInject */
    function InformationController($state){
        var vm = this;

        vm.items=[

            "凡命以日时为根本，大运为扶持，小运为发用",
            "盖五行为神杀之先，或值凶杀，四柱又在衰败之地，则祸并危疑",
            "大抵凶杀所居干神，不宜带真鬼，虽见真官，尚变为鬼，况见真鬼，则为灾祸明矣。（玉霄宝鉴）",
            "诸刑杀须看纳音，与当生年相克者，为灾重，见生者轻；刑杀受旺气者，为灾重；刑杀返遭刑克冲害破者轻；刑杀上带禄马贵人者，必主有大权势也。（李中虚书）",
            "五鬼怕夜生、空亡怕六害、三刑怕金、自刑怕火、羊刃怕金、咸池怕水、劫杀怕金、华盖怕金木、返吟怕鬼（三命篡局）",
            "掩者，伏吟也。冲者，返吟也。",
            "马是扶身之本,禄为养命之源.禄嫌冲破，马忌空亡.",
            ""
        ];

    }

})(this.angular);