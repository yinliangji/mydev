{
                        title: '面积(m2)',
                        key: 'Mj',
                        type: 'html',
                        align: 'center',
                        className: 'zzrwMj_css',
                        renderHeader:(h,params)=>{
                            return h('div', {style: {
                                        display: 'table',
                                        height: '23px'
                                    }},[
                                h('span', 
                                    {style: {
                                        display: 'inline-block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        lineHeight: '23px',
                                        display: 'auto'
                                    }
                                }, '面积(m'), 
                                h('sup',{style:{
                                    top: 8
                                }},'2'),
                                h('span',
                                    {style:{
                                        display: 'inline-block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        lineHeight: '23px',
                                        display: 'auto'
                                    }},')')
                            ]);
                        }
