const en = {
    
    title: "surveillance system",
    
    position:{
        location: "location"
    },
    /********登录页面 语言块 *****/
    login_cpms:{
        watch:"MonitoringSystem",
        useName_placeholder:"Please enter your user name",
        password_placeholder:"Please enter your user password",
        keeplogin_value:"Within 7 days Free login",
        Vcode:"Please enter Verification code",
        login_button_value:"Login",
        tech_support_value:"Techology Support",
        prod_info_value:"Products Information",

        tech_support:"Technical support",
        tech:{
            tS_company:"Guangdong Big Banian Info Tech Co., Ltd",
            tS_tel:"Telephone:",
            tS_email:"Email:",
            tS_qq: "Q Q :"
        },

        prod_info:"Products Information",
        prod:{
            pr_starData:"Start date:",
            pr_numDevices:"number of devices:",
            pr_activeStatus:"Activation status:",
            pr_Serial:"Serial:",
            pr_activeCode:"Activation Code:",    
        },
        Activate_btn:"Activate",

        username_prompt: "please enter user name",
        password_prompt: "please enter the password",
        code_prompt: "please enter verification code"
    },
    /***登录页面底部 语言块**/
    footer_cpms:{   
        name:"Guangdong Big Banian Info Tech Co., Ltd",
        sname:"Monitoring System",
    },
    /** 首页框体导航栏  语言块 */
    index:{
        /*****首页横向导航栏********** */
        nav:{
            name01:"Overview",
            name02:"Room Energy",
            name03:"List of data",
            name04:"Fault Handling",
            name05:"Log",
            name06:"Set Up",
            name07:"documentation",
        },
    },
    /**表格最大值,最小值,平均值 **/
    dataTable: {
        maximum: "maximun",
        minimum: "minimun",
        average: "average",

        excel_alt: "Export excel table",

        /** 表格中数据格式化, 翻译部分 **/
        column_device_status:{
            status1: "not ready",
            status2: "run",
            status4: "downtime",
            status8: "unreachable",
        },
        column_service_status:{
            status1: "no ready",
            status2: "normal",
            status4: "alarm",
            status8: "unknown",
            status16: "serious",
        },

        column_userType: {
            type1: "Super administrator",
            type2: "operator",
            type3: "View staff"
        }
    },
    /**总览页面 */
    overview:{
        sec_one:{
            ht:"Number of device items and monitoring items",
            large_left:"Device",
            large_right:"Monitoring",
            normal_small:"Normal",
            Exception_small:"Exception",
        },
        sec_two:{
            ht:"Device Item and monitor item failure ratio",
            left:"Device",
            right:"Monitoring",
            legend_one:"Normal rate",
            legend_two:"Anomaly Rate",
        },
        sec_three:{
            ht:"Recent environmental curve",    
            sT01:"4hours",
            sT02:"24hours",
            sT03:"week",
            sT04:"month",
            sT05:"year"
        },
        sec_four:{
            ht:"Warning List>>",
            sH01:"Device",
            sH02:"Monitoring",
            sH03:"State",
            sH04:"Information",
            sH05:"Time",
        },
    },
    /** 机房能耗 **/
    energy:{
        ht:{
            sec_one: "The instantaneous PUE",
            sec_two: "Electricity ratio diagram",
            sec_three: "Equipment consumption curve",
            sec_four: "PUE energy consumption analysis"
        },
        sec_two:{
            legend1: "IT equipment power value",
            legend2: "Physical infrastructure",

            prompt1: "Access to the source",
        },
        excel: "Export Excel"
    },
    /** 数据列表 **/
    dataSheets: {
        search_btn: "search",

        option1: {
            op1: "not ready",
            op2: "run",
            op3: "downtime",
            op4: "unreachable"
        },

        option2: {
            op1: "Not ready",
            op2: "normal",
            op3: "alarm",
            op4: "unknown",
            op5: "serious",
        },

        option3: {
            op1: "Not processed",
            op2: "Processed"
        },

        control:{
            label1: "Confirm device alarm",
            label2: "Remove confirmed device alarm",
            label3: "Enable device alarm",
            label4: "Disable device alarm",
            label5: "Enable all monitoring of the device alarm",
            label6: "Disable all monitoring items for the device",

            label7: "Confirm monitoring alarm",
            label8: "Remove the confirmed monitor alarm",
            label9: "Enable monitoring alarm",
            label10: "Disable monitoring item alarm",
        },

        device: {
            name: "equipment",
            selectP: "select device status",
            input1: "enter the device name",

            table:{
                th1: "Device name",
                th2: "state",
                th3: "Recently checked",
                th4: "duration",
                th5: "Alarm buffer",
                th6: "information",
            }
        },

        monitoring: {
            name: "Monitoring items",
            selectP: "Select the monitor status",
            input1: "Enter the device name",
            input2: "Enter the name of the monitoring item",

            table: {
                th1: "Device name",
                th2: "Monitoring items",
                th3: "state",
                th4: "Recently checked",
                th5: "duration",
                th6: "Alarm buffer",
                th7: "information",
            }
        }
    },
    /** 日志 **/
    log:{
        select: "Select the search type",
        input1: "enter search content",
        input2: "Filter parameter to connect with *",

        search_btn: "Search",

        option1:{
            op1: "today",
            op2: "last 24 hours",
            op3: "this week",
            op4: "last week",
            op5: "this month",
            op6: "last month",
            op7: "this year",
            op8: "last year",
            op9: "customize",
        },

        option2: {
            op1: "username",
            op2: "client IP",
            op3: "client type",
            op4: "client platform",
            op5: "action logo",
            op6: "remarks",
        },
        
        table:{
            th1: "Time",
            th2: "UserName",
            th3: "UserTypes",
            th4: "Client IP",
            th5: "Client type",
            th6: "Client platform",
            th7: "Action identification",
            th8: "Remark",
        },

        table2: {
            th1: "Time",
            th2: "Log type",
            th3: "Contact name",
            th4: "Device name",
            th5: "Monitoring item name",
            th6: "The state when triggered",
            th7: "Executive order",
            th8: "Details",
        },

        table3: {
            th1: "Time",
            th2: "Log type",
            th3: "Device name",
            th4: "Triggered monitoring item",
            th5: "The state when triggered",
            th6: "Number of attempts",
            th7: "Details",
        }
    },
    /** 设置 **/
    set:{
        name1: "Equipment management",
        name2: "personnel management",
        name3: "Time management",
        name4: "Port management",
        name5: "Application management",
        name6: "More management",

        set1: {
            describe1: "Modify background map, parameters, ",
            describe2: "and lower limit of monitoring items.",
        },
        set2: {
            describe1: "When the supervisory control equipment appears alarm",
            describe2: "Contacts that need to be notified.",
        },
        set3: {
            describe1: "The manual management server time",
            describe2: "can be kept accurate.",
        },
        set4: {
            describe1: "Change the server's own hardware,",
            describe2: "serial parameters.",
        },
        set5: {
            describe1: "Apply the Settings in the cache to the program",
            describe2: "and restart the program to take effect.",
        },
        set6: {
            describe1: "Close or restart the server.",
        }
    },
    /** 纵向具体设备详情页 **/
    widget:{
        search_btn: "Search",
        tab1:{
            name: "Monitoring items",
            select:{
                option1: "Not ready",
                option2: "Normal    ",
                option3: "Alarm",
                option4: "Unknown",
                option5: "Serious",
            },
            placeholder: "enter the name of the monitoring item",
            placeholder2: "please choose",
            table: {
                th1: "Monitoring items",
                th2: "State",
                th3: "Recently checked",
                th4: "duration",
                th5: "Alarm buffer",
                th6: "Information",
            }
        },
        tab2:{
            name: "Equipment alarm log",
            select: {
                option1: "Last day",
                option2: "Last week",
                option3: "Last month",
                option4: "Last year",
                option5: "Customize",
            },
            placeholder: "Filter parameters, connected by *",
            table: {
                th1: "Time",
                th2: "Triggered monitoring item",
                th3: "The state when triggered",
                th4: "Log identification",
                th5: "Number of attempts",
                th6: "details",
            }
        },
        tab3:{
            name: "Equipment notice log",
            select: {
                option1: "Last day",
                option2: "Last week",
                option3: "Last month",
                option4: "Last year",
                option5: "Customize",
            },
            table:{
                th1: "Time",
                th2: "Triggered monitoring item",
                th3: "Contact name",
                th4: "The state when triggered",
                th5: "Executive order",
                th6: "details",
            }
        },
        tab4: {
            name: "Data curve",
            select: {
                option1: "4 hours",
                option2: "24 hours",
                option3: "A week",
                option4: "A month",
                option5: "One year",
                option6: "Customize",
            },
        }
    },
    /** ElementUI **/
    element: {
        loading_text: "Desperately loading",
        range_separator: "to",
        start_placeholder: "start date",
        end_placeholder: "end date",

        Notification:{
            error_title: "Error",
            success_title: "Success",
            not_object: "Please select the object to be operated"
        }
    },
    /** 监控项,设备项 弹框翻译 **/
    service_dialog:{
        title: "Order",
        object: "Operation object",
        device: "equipment",
        service: "Monitoring",
        order: "order",

        remarks: "remark",
        required: "This is required",
        overdue: "Use overdue Time",
        overdue_placeholder: "Choose the date and time",

        define_btn: "Confirm",
        cancel_btn: "Cancel",
        
        /*设备控制备注*/
        prompt1: "Confirm the device alarm",
        prompt2: "Remove confirmed device alarm",
        prompt3: "Enable device alarm",
        prompt4: "Disable device alarm",
        prompt5: "Enable all monitoring items of device alarm",
        prompt6: "Disable all monitoring items on the device",

        prompt7: "Confirm monitoring item alarm",
        prompt8: "Remove the monitored item alarm",
        prompt9: "Enable monitoring item alarm",
        prompt10: "Disable monitoring item alarm",
    },
    /* 设置内页 */
    // 表格操作按钮：新增、删除、修改; 表格的表头
    Table: {
        Operate_Btn_list: ["Add","Delete","Save","Batch management","Modify","Send mailbox","Test","Compared","Log","Application","Batch management"],
        hostGroup: {
            tableTH:["Group", "Devices", "Background"]
        },
        devices: {
            tableTH: ["Name", "Group", "Contact", "Sort", "Drive", "IP", "Port", "RS485", "Passive connection", "PCRP", "Monitoring item", "More"]
        },
        monitoring: {
            tableTH: ["Monitoring item name", "Contact group", "Monitoring item ID", "Check command", "script", "More"]
        },
        user: {
            data:["Super Admin", "Operator", "Check the member"],
            tableTH: ["Username", "User type", "Group", "Contact group"]
        },
        contactGroup: {
            tableTH: ["Name","Contact"]
        },
        contacts: {
            tableTH: ["Name","Contact group","Email","Voice receiving number","SMS receiving number","Timed notification","More"]
        },
        period: {
            tableTH: ["Name","Alias","Monday","Tuesday","Webnesday","Thursday","Friday","Saturday","Sunday"]
        },
        ports: {
            data: ["Null", "Parity checking", "Odd parity"],
            tableTH: ["Serial port name", "Serial device name", "Serial port baud rate", "Data bit", "Stop bit", "Calibration method", "Listening to TCP port"]
        },
        leftMenu: {
            data: ["Main frame open","New TAB opens"],
            tableTH: ["Name", "Device group", "Sort", "Link", "Aims"]
        },
        timedTask: {
            data: ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday", "Timing task"],
            tableTH: ["Name", "Creator", "Execution time", "Execution cycle/date", "Last performer","Last completed status","Last completed time","Enabled state","Order"]
        },
        forward: {
            data: ["newParameter"],
            tableTH: ["Name", "Type", "IP/Domain address", "Port", "Number"]
        },
        linkage: {
            tableTH: ["Name", "Device","Monitoring item","Working value","Threshold","Remarks","Overrun command","Recovery command"] 
        },
        Box: {
            Delete:{
                title: "Prompt",
                content: "After deletion, it is not recoverable. Click 'Yes' to take effect. Is it confirmed?",
                tips: [
                    // 提示空的
                    "Please select the object you want to delete."
                ],
            },
            Add: {
                hostGroup: {
                    data: "newHostGroup"
                },
                device: {
                    btn: ["add", "remove"],
                    title: "New equipment>>",
                    table_th: ["Name","Quantity","Association command","Hostgroup","Contact group"],
                    tips: [
                        // 提示空的联系人
                        "You must check at least one contact group for each device. If you do not have a contact group yet, please create one first!"
                    ]
                },
                user: {
                    title: "Add a new frame>>",
                    label: [
                        "Username",
                        "User type",
                        "Hostgroup",
                        "Contact group",
                        "Enter password",
                        "Confirm password",
                        "Change Password",
                        "Enter the old password",
                        "Enter a new password",
                        "Confirm the new password",
                    ],
                    placeholder: [
                        "please enter user name",
                        "Password length is 3-20 digits",
                        "Please keep the password input consistent twice."
                    ],
                    option: ["All hostgroup", "All contact", "Super administrator", "operator", "Viewer"],
                    tips: ["Different passwords"]
                },
                contactGroup: {
                    data: "new contact group",
                    title: "Select contact group>>",
                    tips: ["You must check at least one contact group. If you do not have one, please create one first!"]
                },
                contacts: {
                    data: "New contact"
                },
                forward: {
                    title: "Add forwarding parameters>>",
                    label: ["Name", "Type", "IP/Domain name address", "Port", "Number"],
                    option: ["Entrance guard", "video"],
                    placeholder: [
                        "Please enter a name",
                        "Please enter IP domain name address",
                        "Please enter the port number",
                        "Please enter number"
                    ]
                }
            },
            Batch: {
                title: "Batch management>>",
                device: {
                    label: ["Copy the object", "The reference object", "The application object"],
                    batchTemp: ["Hostgroup","Contact group","Sort","IP","Port","RS485"]
                },
                monitoring: {
                    label: ["Copy the parameter", "The reference object", "The application object"],
                    batchTemp: ["The contact group", "Check interval", "Retry interval", "Notify the interval", "Enable the interval"]
                }
            },
            Email: {
                contacts: {
                    title: "Send mailbox Settings>>",
                    label: ["Email address", "Password", "SMTP address"],
                    tips: [
                        "Please enter your full email address",
                        "Password", 
                        "SMTP mail server, such as stmp.126.com",
                        "* note that click the 'test' button to verify that the password entered is correct"
                    ],
                    btn: ["test", "save"]
                }
            },
            Cell: {
                device: {
                    editContactGroups_title: "Select a contact group",
                    more: {
                        title: "Device more parameters",
                        label: ["Check interval","repeat times","Check period","Notification period",
                        "Notification interval","Enable notifications","Use Zigbee", 
                        "Physical address", "Maximum cache", "Protocol version", "SNMP team name",
                        "SNMP version number", "Timeout value"],
                        unit: ["s", "times", "h", "m"]
                    },
                },
                monitoring: {
                    editContactGroups_title: "Select a contact group",
                    editCheckOrder: {
                        title: "Check command",
                        label: ["First level alarm", "Secondary alarm"],
                        label2: ["Minimum", "Maximum"],
                        tips: ["No modifiable parameters!"]
                    },
                    more: {
                        title: "more parameters",
                        label: ["Check interval","repeat times","Check period","Notification period",
                        "Notification interval","Enable notifications","Use Zigbee", 
                        "Physical address", "Maximum cache", "Protocol version", "SNMP team name",
                        "SNMP version number", "Timeout value"],
                        unit: ["s", "times", "h", "m"]
                    },
                },
                contacts: {
                    editContactGroups_title: "Select a contact group",
                    timedNoti: {
                        title: "Timed notification>>",
                        option: [
                            "Open",
                            "every day", "Every 2 days","Every 3 days",
                            "Every 4 days","Every 5 days","Every 6 days", "Every 7 days",
                            
                        ]
                    },
                    more: {
                        title: "More parameters",
                        tab: ["device", "Monitoring item"],
                        label: ["Open notification","Notification period","Notification option","Notification order"],
                        option: ["Crash", "unachievable", "restore", "shake", "Downtime","caveat", "serious", "unknown", "restore", "shake"]
                    }
                },
                timedTask: {
                    cycle: {
                        title: "The lifecycle>>",
                        select: ["Weekly cycle", "A single execution"],
                        option: [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                        ]
                    },
                    order: {
                        title: "Order>>",
                        table_th: ["Name", "Equipment", "Order"]
                    }
                },
                Period: {
                    title: "Time period setting>>",
                    btn: ["Confirm", "Add", "Cancel"],
                    other: "to"
                },
            },
            log: {
                timedTask: {
                    title: "Job log>>",
                    table_th: ["time", "type", "content"],
                    btn: ["confirm"],
                    tips:["Please check the task you want to view first"]
                }
            },
            comcontrast: {
                timedTask: {
                    label: [
                        "Task creation time",
                        "Task creation user",
                        "The last user executed",
                        "Time of last execution",
                        "The last time it was done",
                        "The last completed state",
                        "Task execution time",
                        "Task execution date (single execution time)",
                        "Whether to repeat",
                        "Task execution cycle",
                        "Task current status"
                    ],
                    tips: [
                        "Please choose at least two items for comparison"
                    ]
                }
            },
            modify: {
                title: "Modify>>",
                tips: [
                    "Please select the linkage parameters to be modified",
                    "Select the user to modify",
                    "Select the external link to modify"
                ]
            }
        }
    },
    mDevice: {
        tabTitle:["Set up", "Machine room group", "Device", "Monitoring item"],
    },
    mPersonnel: {
        tabTitle:["Set up", "Login user", "Contact group", "Contact"]
    },
    mTime: {
        tabTitle: ["Set up", "server time", "period"],
        label:["Server time", "Set time"],
        btn: "Save"
    },
    mApplication: {
        tabTitle: ["Set up", "Application settings"],
        btn: "Execute",
        Box: {
            title: "Application Settings>>",
            content: "Make sure the changes are applied to the back-end service for it to take effect？"
        }
    },
    mPorts: {
        tabTitle: ["Set up", "Network Interface", "Hardware serial port"],
        label: [
            "Please select the network interface you want to set",
            "information", "interface", "activity", "byte", "data pack", "error", "sent", "received", "DNS1", "DNS2"
        ],
        title: ["General settings", "IPv4 settings"],
        Btn_list: ["Save", "Add", "Delete"],
        son_table_th: ["IP", "Subnet Mask", "Gateway"]
    },
    mMore: {
        
        tabTitle: ["Set up", "Global parameter", "Background Services", "Backup and restore", "Left side menu", "Webpage alarm", "Timed task","Energy consumption parameter","Forwarding parameter", "Linkage parameter", "Software information"],
        
        globalPara:{
            label: [
                "Record passive check",
                "Record device retry",
                "Record notification event",
                "Record monitoring item retry",
                "Enable notifications",
                "Enable jitter recognition",
                "Equipment check jitter release threshold (%)",
                "Monitoring item check jitter release threshold (%)",
                "Equipment check jitter start threshold (%)",
                "Monitoring item check jitter start threshold (%)",
                "Time unit (seconds)",
                "Notification timeout (seconds)",
                "Device check timeout (seconds)",
                "Monitoring item check timeout (seconds)",
                "invalid symbol",
            ],
            text: [
                "Record the status of the passive check in the log",
                "Record status information of device retry in the log",
                "Record notification events in the log",
                "Record status information of monitoring item retry in the log",
                "This parameter determines whether the notification action is performed when the status of the device or monitoring item changes.",
                "Enabling this parameter prevents the notification storm, that is, the measured value of the monitored object fluctuates around the threshold to cause a large number of notification actions.",
                "The device checks the jitter release threshold. Below this value, the device's jitter state will be released, and the corresponding notification function of the device will be restored (check to enable jitter recognition to be effective)",
                "The monitoring item checks the jitter release threshold. Below this value, the jitter state of the device will be released, and the notification function corresponding to the monitoring item is restored (check to enable the jitter recognition to be effective).",
                "The device checks the jitter start threshold. When this value is exceeded, it means that the device enters the jitter state, and the corresponding notification function of the device is disabled (checking to enable jitter recognition is valid).",
                "The monitoring item checks the jitter start threshold. When this value is exceeded, it means that the device enters the jitter state. The notification item corresponding to the notification function is disabled (check the Enable jitter identification to be effective).",
                "All intervals are in this unit, ie if the check interval of the device is 3, then the actual time is 3 and multiplied by the time unit (the default is 10 seconds) equals 30 seconds. Note: Decreasing the value of this parameter will increase the system load. The opposite is to reduce the load. (use with caution)",
                "When the command that sends the notification executes more than this value, the notification command will be terminated.",
                "The command will be terminated when the execution time of the device check command exceeds this value.",
                "When the execution time of the monitoring item check command exceeds this value, the command will be terminated and return to the state after the preset monitoring item has timed out.",
                "All names cannot contain any one of them",
                
                "Notes: 1. Jitter identification principle: The background program will analyze the status of the last 21 checks of each device or monitoring item, that is, the state change of up to 20 times. When the number of state changes is divided by 20, the percentage exceeds the set jitter. When the threshold is started, notifications about the device or monitoring item will be prohibited from being sent until the number of status changes of the device or monitoring item is divided by 20 and converted to a percentage below the set jitter stopping threshold."
            ],
            btn: 'Save'
        },

        Backstage: {
            label: ["Please select the background service you want to set.", "Please select the switch status you want to set."],
            option: ["clear cache", "Enable background services", "Stop background service", "Shut down", "Restart"],
            btn: "execute",
            Prompt: {
                content: [
                    {
                        title: "Clear cache",
                        text: "After clicking Yes, the cache will be cleared and will continue？"
                    },
                    {
                        title: "Start background service",
                        text: "Click Yes to start the background service, whether to continue？"
                    },
                    {
                        title: "Stop background service",
                        text: "Click Yes to stop the background service and continue？"
                    },
                    {
                        title: "Shut down",
                        text: "After clicking Yes, the server will be shut down and continue？"
                    },
                    {
                        title: "Restart",
                        text: "After clicking Yes, the server will be restarted. Continue?"
                    },
                ],
                btn: ["Yes", "No"]
            },
            tips: [
                "Insufficient permissions or user authentication timeout, please login again",
                "Error:"
            ],
            import_drive:{
                title: "Drive the import>>",
                option: "Replace existing drivers"
            }
        },

        leftMenu: {
            Prompt: {
                title: ["Add external connection>>", "Modify link>>"],
                label: ["Name","link address","Open mode","Category Name","Affiliated device group"],
                placeholder: [
                    "Please enter the name of the external link",
                    "Please enter the address of the external link",
                    "Please enter a category name",
                ],
                select_opt: ["Main frame open", "New tab open"],
                btn: ["Yes", "No"]
            }
        },

        backup: {
            label: "Please select the setting data you want to restore",
            btn: ["reduce", "Backup", "Import driver"]
        },
        
        webAlarm: {
            title: ["Web popup alarm", "Web language alarm"],
            option: ["ON", "OFF"],
            btn: 'Save'
        },

        energyTab: {
            label: ["engine room", 'Monitoring item', 'Unjoined monitoring items', 'Joined monitoring items'],
            btn: ['Add', 'Remore', 'Save'],
            son_table_th: ["All", "Name", "Equipment", "Type"],
            tips: [
                "No data"
            ],
            type_option: ["IT power item", "Physical infrastructure", "Electrical items", "Input power term"]
        },

        linkage: {
            prompt:{
                title: '联动参数'
            }
        },

        software_Btn: ["Save", "Upload", "Modify", "Reduction"],
        software_label: [
            "Help document",
            "Login page LOGO (width: 155px height: 50px)",
            "Home LOGO (width 170px high 60px recommended white)",
            "company information",
            "surveillance system"
        ],
        software_edition: [
            "BBN Standard Edition",
            "Custom version",
            "Default neutral version",
            "Ocean Custom Edition",
            "Sekrid version"
        ],
        software_prompt: {
            title: "Version switch",
            content: ["Will switch to the", "version soon, is it confirmed?"],
            btn: ["Yes", "No"]
        }
    },
    Prompt_btn: ["Yes", "No"],
    laypage: ["First", "Last", "Previous", "Next"],
    Tips: [
        "Delete done!",
        "Modification completed!",
        "Save complete!",
        "The contact group cannot be empty",
        "New success",
        "Delete the success",
        "The update is successful",
        "Select at least two items for operation"
    ]
}
export default en;