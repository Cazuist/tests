const launches = [
  {
    'run_id': '1504_1221',
    'meta': {
        'tool_version': '0.1.23',
        'start_time': '1588762325',
        'duration': 2300,
        'app_version': '',
        'status': 0
    } ,
    'tests': [
        {
            'name': 'portfolio',
            'duration': 120,
            'results': {
                "throughput": 12,
                'max': 100,
                'avg': 511,
                '% errors': 0,
                'smthelse': 15,
            }

        },
        {
            'name': 'portfolio_short',
            'duration': 300,
            'results': {
                "throughput": 12,
                'max': 11,
                'avg': 5,
                '% errors': 20
            }

        },
        {
            'name': 'hedging',
            'duration': 110,
            'results': {
                "throughput": 12,
                'max': 101,
                'avg': 50,
                '% errors': 0.2
            }

        },

        {
            'name': 'trading',
            'duration': 1320,
            'results': {
                "throughput": 12,
                'max': 1100,
                'avg': 534.43,
                '% errors': 0
            }

        },
        {
            'name': 'trading_stress',
            'duration': 120,
            'results': {
                "throughput": 0.3,
                'max': 1100,
                'avg': 500.001,
                '% errors': 0
            }

        },
        {
            'name': 'adding_test',
            'duration': 120,
            'results': {
                "throughput": 0.3,
                'max': 1100,
                'avg': 500.001,
                '% errors': 0
            }

        },
    ]
},

{
    'run_id': '1504_1220',
    'meta': {
        'tool_version': '0.1.23',
        'start_time': '1588760000',
        'duration': 2300,
        'app_version': '',
        'status': 0
    } ,
    'tests': [
        {
            'name': 'portfolio',
            'duration': 120,
            'results': {
                "throughput": 12,
                'max': 100,
                'avg': 511,
                '% errors': 0,
                'smthelse': 15,
            }

        },
        {
            'name': 'portfolio_short',
            'duration': 300,
            'results': {
                "throughput": 12,
                'max': 11,
                'avg': 5,
                '% errors': 20
            }

        },
        {
            'name': 'hedging',
            'duration': 110,
            'results': {
                "throughput": 12,
                'max': 101,
                'avg': 50,
                '% errors': 0.2
            }

        },

        {
            'name': 'trading',
            'duration': 1320,
            'results': {
                "throughput": 12,
                'max': 1100,
                'avg': 534.43,
                '% errors': 0
            }

        },
        {
            'name': 'trading_stress',
            'duration': 120,
            'results': {
                "throughput": 0.3,
                'max': 1100,
                'avg': 500.001,
                '% errors': 0
            }

        },
    ]
}


];

module.exports = {launches};