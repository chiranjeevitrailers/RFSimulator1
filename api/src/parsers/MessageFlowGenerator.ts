import { logger } from '../utils/logger'

export interface ProtocolMessage {
  id: string
  order: number
  layer: string
  direction: string
  messageType: string
  rawLog: string
  parsedMessage: any
  correlationKeys: any
  timestamp: Date
}

export class MessageFlowGenerator {
  public generateAttachFlow(): ProtocolMessage[] {
    const messages: ProtocolMessage[] = []
    const baseTime = Date.now()
    const rnti = 0x003D
    const sTMSI = '0x12345678'
    const cellId = '0x000001'
    const plmnId = '00101'
    const tac = '0001'

    // RRC Connection Request
    messages.push({
      id: 'msg-1',
      order: 1,
      layer: 'RRC',
      direction: 'UE→eNB',
      messageType: 'RRCConnectionRequest',
      rawLog: `RRC: UL-CCCH-Message ::= {
        message c1 : rrcConnectionRequest : {
          criticalExtensions rrcConnectionRequest-r8 : {
            ue-Identity s-TMSI : ${sTMSI},
            establishmentCause mo-Data,
            spare bit-string (SIZE(1)) : '0'B
          }
        }
      }`,
      parsedMessage: {
        message: {
          c1: {
            rrcConnectionRequest: {
              criticalExtensions: {
                'rrcConnectionRequest-r8': {
                  'ue-Identity': {
                    's-TMSI': sTMSI
                  },
                  establishmentCause: 'mo-Data',
                  spare: '0'
                }
              }
            }
          }
        }
      },
      correlationKeys: {
        rnti,
        sTMSI,
        cellId
      },
      timestamp: new Date(baseTime)
    })

    // RRC Connection Setup
    messages.push({
      id: 'msg-2',
      order: 2,
      layer: 'RRC',
      direction: 'eNB→UE',
      messageType: 'RRCConnectionSetup',
      rawLog: `RRC: DL-CCCH-Message ::= {
        message c1 : rrcConnectionSetup : {
          rrc-TransactionIdentifier 0,
          criticalExtensions rrcConnectionSetup-r8 : {
            radioResourceConfigDedicated {
              srb-ToAddModList {
                {
                  srb-Identity 1,
                  rlc-Config explicitValue : {
                    ul-AM-RLC {
                      t-PollRetransmit ms50,
                      pollPDU p4,
                      pollByte kB25,
                      maxRetxThreshold t4
                    },
                    dl-AM-RLC {
                      t-Reordering ms35,
                      t-StatusProhibit ms0
                    }
                  },
                  logicalChannelConfig {
                    ul-SpecificParameters {
                      priority 1,
                      prioritisedBitRate infinity,
                      bucketSizeDuration ms100
                    }
                  }
                }
              }
            }
          }
        }
      }`,
      parsedMessage: {
        message: {
          c1: {
            rrcConnectionSetup: {
              'rrc-TransactionIdentifier': 0,
              criticalExtensions: {
                'rrcConnectionSetup-r8': {
                  radioResourceConfigDedicated: {
                    srbToAddModList: [{
                      srbIdentity: 1,
                      rlcConfig: {
                        explicitValue: {
                          ulAMRLC: {
                            tPollRetransmit: 'ms50',
                            pollPDU: 'p4',
                            pollByte: 'kB25',
                            maxRetxThreshold: 't4'
                          },
                          dlAMRLC: {
                            tReordering: 'ms35',
                            tStatusProhibit: 'ms0'
                          }
                        }
                      },
                      logicalChannelConfig: {
                        ulSpecificParameters: {
                          priority: 1,
                          prioritisedBitRate: 'infinity',
                          bucketSizeDuration: 'ms100'
                        }
                      }
                    }]
                  }
                }
              }
            }
          }
        }
      },
      correlationKeys: {
        rnti,
        cRNTI: rnti
      },
      timestamp: new Date(baseTime + 1000)
    })

    return messages
  }
}