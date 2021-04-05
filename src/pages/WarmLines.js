import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { background, primary } from './config';
import CutomHeader from './CutomHeader';


export default function WarmLine() {

    const [warms, setWarms] = useState([
        {
            state: 'Alaska',
            detials: [
                {
                    warmLine: 'Kenai Alaska Warmline',
                    warmLineSec: '(only residents of Alaska)',
                    phoneNumber: '(907) 283-7511',
                    operation: '24/7'
                },
                {
                    warmLine: 'Careline of Alaska',
                    warmLineSec: '',
                    phoneNumber: '(877) 266-4357 ',
                    operation: '24/7'
                },
            ],
        },
        {
            state: 'Alabama',
            detials: [
                {
                    warmLine: 'Wings Across Alabama Warmline',
                    warmLineSec: '',
                    phoneNumber: '(844) 999-4647',
                    operation: 'M-F 2pm - 8pm / Sat-Sun 3pm - 8pm'
                },
            ]
        },
        {
            state: 'Arkansas',
            detials: [
                {
                    warmLine: 'Arkansas Crisis Center',
                    warmLineSec: '',
                    phoneNumber: '(888) 274-7472',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Arizona',
            detials: [
                {
                    warmLine: 'Maricopa County Warmline',
                    warmLineSec: '(only residents of Maricopa County, AZ)',
                    phoneNumber: '(602) 347-1100',
                    operation: '24/7'
                },
                {
                    warmLine: 'HOPE Inc. Warmline',
                    warmLineSec: '(only residents of Arizona) ',
                    phoneNumber: '(520) 770-9909 ',
                    operation: 'Daily, 8am - 10pm'
                },
            ]
        },
        {
            state: 'California',
            detials: [
                {
                    warmLine: 'California Peer-run Warmline',
                    warmLineSec: '(only residents of California) ',
                    phoneNumber: '(855) 845-7415',
                    operation: '24/7'
                },
                {
                    warmLine: 'San Joaquin Warmline',
                    warmLineSec: '(only residents of San Joaquin County, CA)',
                    phoneNumber: '(209) 468-3585',
                    operation: 'Daily, 8am - 10pm'
                },
                {
                    warmLine: 'NAMI Orange County Warmline',
                    warmLineSec: '',
                    phoneNumber: '(877) 910-9276',
                    operation: '24/7'
                },
                {
                    warmLine: 'Project Return Warmline',
                    warmLineSec: '',
                    phoneNumber: '(888) 448-9777',
                    operation: 'M-F 5pm - 10pm / Sat 11am - 4pm'
                },
            ]
        },
        {
            state: 'Colorado',
            detials: [
                {
                    warmLine: 'Colorado Crisis and Support Line ',
                    warmLineSec: '(only residents of Colorado)',
                    phoneNumber: '(844) 493-8255',
                    operation: 'Daily, 7am - 12midnight'
                },
            ]
        },
        {
            state: 'Connecticut',
            detials: [
                {
                    warmLine: 'Soundview Warmline',
                    warmLineSec: '(only residents of Connecticut)',
                    phoneNumber: '(800) 921-0359',
                    operation: 'Daily, 9am - 9pm'
                },
                {
                    warmLine: 'Community Warmline',
                    warmLineSec: '',
                    phoneNumber: '(203) 732-2004',
                    operation: 'Sun-Th 6pm - 10pm / F-Sat 6pm - 11pm'
                },
            ]
        },
        {
            state: 'Florida',
            detials: [
                {
                    warmLine: 'Clear Warm Line ',
                    warmLineSec: '',
                    phoneNumber: '(800) 945-1355',
                    operation: 'Daily, 4pm - 10pm'
                },
                {
                    warmLine: 'Central Florida Crisis Line',
                    warmLineSec: '',
                    phoneNumber: '(407) 425-2624',
                    operation: '24/7'
                },
                {
                    warmLine: 'MHA SETH Line',
                    warmLineSec: '',
                    phoneNumber: '(954) 578-5640',
                    operation: 'M-F 6pm - 10pm'
                },
            ]
        },
        {
            state: 'Washington, D.C.',
            detials: [
                {
                    warmLine: 'Access Helpline',
                    warmLineSec: '',
                    phoneNumber: '(888) 793-4357',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Georgia',
            detials: [
                {
                    warmLine: 'Cares Warmline',
                    warmLineSec: '',
                    phoneNumber: '(844) 326-5400',
                    operation: 'Daily, 8:30am - 11pm'
                },
                {
                    warmLine: 'Peer2Peer Warmline ',
                    warmLineSec: '(only residents of Georgia)',
                    phoneNumber: '(888) 945-1414',
                    operation: '24/7'
                },
                {
                    warmLine: 'Bartough County Peer to Peer Warmline ',
                    warmLineSec: '(only residents of Georgia) ',
                    phoneNumber: '(770) 276-2019',
                    operation: '24/7'
                },
                {
                    warmLine: 'Colquitt Peer Support Line ',
                    warmLineSec: '(only residents of Georgia) ',
                    phoneNumber: '(229) 873-9737',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Iowa',
            detials: [
                {
                    warmLine: 'Iowa Warmline',
                    warmLineSec: '(only residents of Iowa)',
                    phoneNumber: '(844) 775-9276',
                    operation: 'Daily, 12noon - 10pm'
                },
                {
                    warmLine: 'Foundation 2 Crisis Line',
                    warmLineSec: '(only residents of Iowa)',
                    phoneNumber: '(319) 362-2174',
                    operation: '24/7'
                },
                {
                    warmLine: 'Rhonda\'s House Support Line',
                    warmLineSec: '(only residents of Iowa) ',
                    phoneNumber: '(516) 688-7484',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Illinois',
            detials: [
                {
                    warmLine: 'Illinois Warmline',
                    warmLineSec: '(only residents of Illinois)',
                    phoneNumber: '(866) 359-7953',
                    operation: 'M-Sat 8am - 8pm '
                },
                {
                    warmLine: 'Crisis Line of Fox Valley',
                    warmLineSec: '',
                    phoneNumber: '(630) 966-9393',
                    operation: '24/7'
                },
                {
                    warmLine: 'Rhonda\'s House Support Line',
                    warmLineSec: '(only residents of Illinois) ',
                    phoneNumber: '(516) 688-7484',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Indiana',
            detials: [
                {
                    warmLine: 'KEYS National Warmline',
                    warmLineSec: '(only residents of Illinois)',
                    phoneNumber: '(800) 933-5397',
                    operation: 'M-F 8am - 4:30pm'
                },
            ]
        },
        {
            state: 'Kansas',
            detials: [
                {
                    warmLine: 'Headquarters Counseling Center',
                    warmLineSec: '(only residents of Kansas)',
                    phoneNumber: '(785) 841-2345',
                    operation: '24/7'
                },
                {
                    warmLine: 'Compassionate Ear Warmline',
                    warmLineSec: '',
                    phoneNumber: '(866) 927-6327 ',
                    operation: 'Daily, 4pm - 6pm '
                },
            ]
        },
        {
            state: 'Kentucky',
            detials: [
                {
                    warmLine: 'Center Stone Crisis Line',
                    warmLineSec: '',
                    phoneNumber: '(800) 221-0446 ',
                    operation: '24/7'
                },
                {
                    warmLine: 'Warmline',
                    warmLineSec: '',
                    phoneNumber: '(877) 840-5167',
                    operation: 'M-Sat 5pm - 9pm'
                },
            ]
        },
        {
            state: 'Kentucky',
            detials: [
                {
                    warmLine: 'Baycove Peer Support Warmline ',
                    warmLineSec: '(only residents of Massachusetts)',
                    phoneNumber: '(857) 378-4997',
                    operation: 'M-F 9am - 5pm'
                },
                {
                    warmLine: 'Edinburg Peer Warmline ',
                    warmLineSec: '',
                    phoneNumber: '(617) 875-0748',
                    operation: 'Daily, 5:30pm - 9:30pm'
                },
            ]
        },
        {
            state: 'Maine',
            detials: [
                {
                    warmLine: 'Intentional Warmline',
                    warmLineSec: '(only residents of Maine)',
                    phoneNumber: '(866) 771-9276',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Maryland',
            detials: [
                {
                    warmLine: 'Make Lemonade Warm-Line ',
                    warmLineSec: '(only residents of Maryland)',
                    phoneNumber: '(877) 794-7337',
                    operation: 'Mon & Wed 4pm - 3am / Tu &Thu 9am - 4pm / Sat 3pm – 12midnight'
                },
                {
                    warmLine: 'Maryland Crisis Line ',
                    warmLineSec: '(only residents of Maryland) ',
                    phoneNumber: '(800) 422-0009',
                    operation: '24/7'
                },
                {
                    warmLine: 'Anne Arundel County Crisis Warm Line ',
                    warmLineSec: '',
                    phoneNumber: '(410) 768-5522',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Michigan',
            detials: [
                {
                    warmLine: 'Certified Peer Support Specialist Warmline',
                    warmLineSec: '',
                    phoneNumber: '(888) 733-7753',
                    operation: 'Daily, 10am - 2am'
                },
            ]
        },
        {
            state: 'Minnesota',
            detials: [
                {
                    warmLine: 'Certified Peer Support Specialist Warmline',
                    warmLineSec: '(only residents of Minnesota) ',
                    phoneNumber: '(877) 404-3190',
                    operation: 'M-Sat 12noon - 10pm '
                },
            ]
        },
        {
            state: 'Missouri',
            detials: [
                {
                    warmLine: 'Compassionate Ear Warmline ',
                    warmLineSec: '',
                    phoneNumber: '(866) 927-6327',
                    operation: 'Daily, 4pm - 10pm'
                },
                {
                    warmLine: 'NAMI Missouri Warmline ',
                    warmLineSec: '(only residents of Missouri) ',
                    phoneNumber: '(800) 374-2138',
                    operation: 'M-F 9am - 5pm'
                },
            ]
        },
        {
            state: 'Mississippi',
            detials: [
                {
                    warmLine: 'Contact The Crisis Line',
                    warmLineSec: '',
                    phoneNumber: '(601) 713-4357',
                    operation: '24/7'
                },
                {
                    warmLine: 'Contact Helpline',
                    warmLineSec: '',
                    phoneNumber: '(662) 328-0200',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Montana',
            detials: [
                {
                    warmLine: 'MHA Montana Warmline',
                    warmLineSec: '',
                    phoneNumber: '(877) 688-3377',
                    operation: 'M-F 8am - 9pm / Sat-Sun 12noon - 9pm'
                },
            ]
        },
        {
            state: 'Nebraska',
            detials: [
                {
                    warmLine: 'Keya House Warmline ',
                    warmLineSec: '(only residents of Nebraska) ',
                    phoneNumber: '(402) 261-5959',
                    operation: '24/7'
                },
                {
                    warmLine: 'Honu Warmline',
                    warmLineSec: '',
                    phoneNumber: '(402) 975-2032',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'North Dakota',
            detials: [
                {
                    warmLine: 'Firstlink ',
                    warmLineSec: '',
                    phoneNumber: '(701) 235-7335',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'New Hampshire',
            detials: [
                {
                    warmLine: 'Keene Area Warmline',
                    warmLineSec: '',
                    phoneNumber: '(866) 352-5093',
                    operation: 'M, W and Sun, 4pm - 9pm'
                },
                {
                    warmLine: 'Steppine Stone Warmline',
                    warmLineSec: '',
                    phoneNumber: '(888) 582-0920, press 9',
                    operation: 'Daily, 5pm - 10pm'
                },
            ]
        },
        {
            state: 'New Jersey',
            detials: [
                {
                    warmLine: 'CONTACT of Ocean & Monmouth Counties',
                    warmLineSec: '',
                    phoneNumber: '(732) 240-6100',
                    operation: '24/7'
                },
                {
                    warmLine: '2nd Floor Youth HelpLine',
                    warmLineSec: '(Youth, ages 10 - 24 only)',
                    phoneNumber: '(888) 222-2228',
                    operation: '24/7'
                },
            ]
        },
        {
            state: ' New Mexico',
            detials: [
                {
                    warmLine: 'PEER to PEER Warmline ',
                    warmLineSec: '(only residents of New Mexico)',
                    phoneNumber: '(855) 466-7100',
                    operation: 'Daily, 3:30pm - 11:30pm '
                },
                {
                    warmLine: 'Agora Crisis Center ',
                    warmLineSec: '',
                    phoneNumber: '(505) 277-3013',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'New York',
            detials: [
                {
                    warmLine: 'Mental Health Empowerment Project',
                    warmLineSec: '',
                    phoneNumber: '(800) 643-7462 ',
                    operation: '24/7'
                },
                {
                    warmLine: 'Phone Link',
                    warmLineSec: '',
                    phoneNumber: '(516) 489-0100',
                    operation: 'M-F 9am - 9pm'
                },
                {
                    warmLine: 'NYC Well ',
                    warmLineSec: '',
                    phoneNumber: '(888) 692-9355',
                    operation: '24/7'
                },
                {
                    warmLine: 'Family of Woodstock',
                    warmLineSec: '',
                    phoneNumber: '(845) 679-2485',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Nevada',
            detials: [
                {
                    warmLine: 'NAMI Western Nevada Cares Warmline',
                    warmLineSec: '',
                    phoneNumber: '(775) 241-4212',
                    operation: 'M-F 8am - 10pm / Sat-Sun 8am - 9pm'
                },
            ]
        },
        {
            state: 'Ohio',
            detials: [
                {
                    warmLine: 'Contact Crawford County',
                    warmLineSec: '',
                    phoneNumber: '(419) 562-9010',
                    operation: '24/7'
                },
                {
                    warmLine: 'Portage Path Behavioral Health',
                    warmLineSec: '',
                    phoneNumber: '(330) 434-9144',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Oregon',
            detials: [
                {
                    warmLine: 'David Romprey Oregon Warmline',
                    warmLineSec: '(only residents of Oregon) ',
                    phoneNumber: '(800) 698-2392',
                    operation: 'Daily, 9am - 11pm '
                },
            ]
        },
        {
            state: 'Pennsylvania',
            detials: [
                {
                    warmLine: 'Community Behavioral Health',
                    warmLineSec: '(only residents of Pennsylvania)',
                    phoneNumber: '(855) 507-9276',
                    operation: 'M-F 4pm - 7 pm'
                },
                {
                    warmLine: 'Bucks County Warmline ',
                    warmLineSec: '(only residents of Pennsylvania)',
                    phoneNumber: '(215) 896-9717',
                    operation: 'M-F 10am - 6pm'
                },
                {
                    warmLine: 'Teen TalkLine',
                    warmLineSec: ' (Montgomery County, PA residents only)',
                    phoneNumber: '(866) 825-5856',
                    operation: 'Daily, 1pm - 9pm '
                },
                {
                    warmLine: 'Allegheny County Warmline',
                    warmLineSec: '(only residents of Pennsylvania)',
                    phoneNumber: '(866) 661-9276 ',
                    operation: 'Daily, 9am - 1am'
                },
                {
                    warmLine: 'Peer Support Talk Line ',
                    warmLineSec: '(only residents of Pennsylvania)',
                    phoneNumber: '(855) 715-8255 ',
                    operation: 'Daily, 1pm - 9 pm '
                },
                {
                    warmLine: 'Valley Creek Crisis Center Warm Line',
                    warmLineSec: '',
                    phoneNumber: '(866) 846-2722',
                    operation: 'M-F 8am - 10pm / Sat-Sun 10am-10pm'
                },
                {
                    warmLine: 'Contact Altoona',
                    warmLineSec: '',
                    phoneNumber: '(814) 946-9050',
                    operation: 'Daily, 7am - 11pm'
                },
                {
                    warmLine: 'Contact Helpline (211)',
                    warmLineSec: '',
                    phoneNumber: '(800) 932-4616',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'South Carolina',
            detials: [
                {
                    warmLine: 'South Carolina Crisis Line',
                    warmLineSec: '(only residents of South Carolina) ',
                    phoneNumber: '(864) 271-8888 ',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'South Dakota',
            detials: [
                {
                    warmLine: 'South Dakota Helpline Cente',
                    warmLineSec: '(only residents of South Dakota) ',
                    phoneNumber: '(605) 339-4357',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Tennessee',
            detials: [
                {
                    warmLine: 'Contact 211 ',
                    warmLineSec: '(Serving counties of Eastern Northeast TN only)',
                    phoneNumber: '(423) 926-0144',
                    operation: 'M-F 9am - 9 pm '
                },
                {
                    warmLine: 'MHA of East TN',
                    warmLineSec: '(only residents of Tennessee)',
                    phoneNumber: '(865) 584-9125',
                    operation: 'M-F 8:30am - 5pm '
                },
                {
                    warmLine: 'The Crisis Line',
                    warmLineSec: '',
                    phoneNumber: '(615) 244-7444',
                    operation: '24/7'
                },
            ]
        },
        {
            state: 'Texas',
            detials: [
                {
                    warmLine: 'An Ear to Listen and a Passion to Care',
                    warmLineSec: '',
                    phoneNumber: '(844) 755-4673',
                    operation: 'M-F 12noon - 10pm / Sat 10am - 2pm '
                },
                {
                    warmLine: 'MHA Texas Warm Lin',
                    warmLineSec: '',
                    phoneNumber: '(817) 546-7826',
                    operation: 'M-F 8am - 5pm '
                },
            ]
        },
        {
            state: 'Utah',
            detials: [
                {
                    warmLine: 'Utah Warmline ',
                    warmLineSec: '(only residents of Utah)',
                    phoneNumber: '(801) 587-1055',
                    operation: 'Daily, 8am - 11pm '
                },
            ]
        },
        {
            state: 'Virginia',
            detials: [
                {
                    warmLine: 'MHA Peer Recovery Warmline of Virginia ',
                    warmLineSec: '(only residents of Virginia)',
                    phoneNumber: '(866) 400-6428',
                    operation: 'M-F 9am-9pm / Sat-Sun 5pm-9pm'
                },
            ]
        },
        {
            state: 'Vermont',
            detials: [
                {
                    warmLine: 'Pathways Vermont Support Line ',
                    warmLineSec: '(only residents of Vermont) ',
                    phoneNumber: '(833) 888-2557',
                    operation: '24/7'
                },
            ]
        },
        {
            state: ' West Virginia',
            detials: [
                {
                    warmLine: 'Emotional Strength ',
                    warmLineSec: '(only residents of West Virginia)',
                    phoneNumber: '(877) 435-7304',
                    operation: '24/7'
                },
            ]
        },

    ]);
    const [selcted, setSelected] = useState(false);

    return (
        <>
        <CutomHeader title="Warm Lines"/>
        <ScrollView contentContainerStyle={{ backgroundColor: background }}>
            <View style={styles.container}>
                {!!warms.length && warms.map((e, i) => {
                    return (
                        <TouchableOpacity disabled={i == selcted && true} onPress={() => setSelected(i)} style={styles.card} key={i}>
                            <Text style={styles.state}>{e.state}</Text>
                            {selcted === i && e.detials?.length && e.detials?.map((e, i) => {
                                return (
                                    <TouchableOpacity
                                    onPress={()=>Linking.openURL(`tel:${e.phoneNumber}`)}
                                     key={i / 822} style={styles.btn}>
                                        <View style={styles.row}>
                                            <Text>Warmline</Text>
                                            <View>
                                                <Text>{e.warmLine}</Text>
                                                {!!e.warmLineSec && <Text>{e.warmLineSec}</Text>}
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <Text>Phone Number</Text>
                                            <Text style={styles.phone}>{e.phoneNumber}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text>Hours of operation</Text>
                                            <Text style={styles.hours}>{e.operation}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}

                        </TouchableOpacity>
                    )
                })
                }
            </View>
            <View style={{ height: 50 }} />
        </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        borderWidth: 0.5,
        borderColor: 'grey',
        elevation: 2,
        marginTop: 40
    },
    state: {
        color: 'grey',
        fontWeight: 'bold',
        letterSpacing: 1,
        alignSelf: 'center',
        fontSize: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    phone: {
        color: primary
    },
    btn: {
        marginTop: 20,
        borderTopColor: 'grey',
        borderTopWidth: 0.5
    },
    hours: {
        width: '50%',
        alignSelf: 'flex-end',
        textAlign: 'right'
    }
})